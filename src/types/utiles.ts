import { FormEvent } from 'react';

export type FormEventHandler<T = Element> = (event: FormEvent<T>) => void;
