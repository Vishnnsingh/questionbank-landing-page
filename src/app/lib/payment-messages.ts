function pickField(error: unknown, key: string): string {
  if (!error || typeof error !== 'object') return '';
  const record = error as Record<string, unknown>;
  const nested =
    record.error && typeof record.error === 'object'
      ? (record.error as Record<string, unknown>)
      : null;
  const value = record[key] ?? nested?.[key];
  if (value == null) return '';
  return String(value).trim();
}

function tryParseJsonMessage(raw: string): unknown | null {
  const text = raw.trim();
  if (!text.startsWith('{')) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function formatPaymentUserMessage(
  error: unknown,
  fallback = 'Payment failed. Please try again.',
): string {
  if (!error) return fallback;

  if (typeof error === 'string') {
    const parsed = tryParseJsonMessage(error);
    if (parsed) return formatPaymentUserMessage(parsed, fallback);
    if (error.includes('Network')) {
      return 'Network issue. Check your connection and try again.';
    }
    if (error !== 'undefined' && !error.startsWith('{')) return error;
    return fallback;
  }

  if (error instanceof Error) {
    const parsed = tryParseJsonMessage(error.message);
    if (parsed) return formatPaymentUserMessage(parsed, fallback);
    if (error.message.includes('Network')) {
      return 'Network issue. Check your connection and try again.';
    }
    if (error.message && error.message !== 'undefined' && !error.message.startsWith('{')) {
      return error.message;
    }
    return fallback;
  }

  const code = pickField(error, 'code');
  const description = pickField(error, 'description');
  const reason = pickField(error, 'reason');
  const step = pickField(error, 'step');
  const message = pickField(error, 'message');

  if (code === '0') return 'Payment was cancelled.';

  if (/cancel/i.test(reason) || /cancel/i.test(description) || /cancel/i.test(message)) {
    return 'Payment was cancelled.';
  }

  if (reason === 'payment_error' || step === 'payment_authentication') {
    return 'Payment failed. Please check your UPI app or try again.';
  }

  if (code === 'BAD_REQUEST_ERROR') {
    return 'Payment could not be completed. Please try again.';
  }

  if (description && description !== 'undefined' && !description.startsWith('{')) {
    return description;
  }

  if (message && message !== 'undefined' && !message.startsWith('{')) {
    return message;
  }

  return fallback;
}
