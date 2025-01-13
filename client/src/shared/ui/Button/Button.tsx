import classNames from "classnames";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type CombinedProps = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren;

interface ButtonProps extends CombinedProps {
  className?: string;
}

export const Button = ({
  className,
  children,
  disabled,
  ...otherProps
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        "bg-transparent border-none hover:scale-110 duration-200 ease-linear active:scale-90",
        { "grayscale pointer-events-none": disabled },
        className
      )}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};
