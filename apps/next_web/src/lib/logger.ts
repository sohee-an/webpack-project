// src/lib/logger.ts
type LogLevel = 'info' | 'warn' | 'error';

type LogContext = {
  layer: 'middleware' | 'gssp' | 'api' | 'client';
  path?: string;
  method?: string;
  message?: string;
  error?: unknown;
  extra?: Record<string, unknown>;
};

function formatError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  return { error };
}

function log(level: LogLevel, ctx: LogContext) {
  const base = {
    level,
    layer: ctx.layer,
    path: ctx.path,
    method: ctx.method,
    message: ctx.message,
    extra: ctx.extra,
    timestamp: new Date().toISOString(),
    ...(ctx.error ? formatError(ctx.error) : {}),
  };

  // 현재는 console로만, 나중에 여기서 Sentry, Datadog, CloudWatch 등으로 보냄
  if (level === 'error') {
    console.error(base);
  } else if (level === 'warn') {
    console.warn(base);
  } else {
    console.log(base);
  }
}

export function logInfo(ctx: LogContext) {
  log('info', ctx);
}

export function logWarn(ctx: LogContext) {
  log('warn', ctx);
}

export function logError(ctx: LogContext) {
  log('error', ctx);
}
