"use client";

import { useFormStatus } from "react-dom";

const Submit = ({ label, ...btnProps }) => {
  const { pending } = useFormStatus();

  return (
    <button {...btnProps} type="submit">
      {pending ? "Loading..." : label}
    </button>
  );
};
export default Submit;
