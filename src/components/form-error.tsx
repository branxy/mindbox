export interface FormErrorProps {
  errors: string | string[];
}

export function FormError({ errors }: FormErrorProps) {
  if (Array.isArray(errors)) {

    return errors.map((e, i) => (
      <p key={e + i} className="mt-0.5 text-xs text-red-300">
      {e}
    </p>
  ));
  } else return (
    <p className="mt-0.5 text-xs text-red-300">
      {errors}
    </p>
  );
}
