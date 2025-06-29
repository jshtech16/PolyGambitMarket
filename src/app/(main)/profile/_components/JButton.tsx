import "./style.scss";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { ClipLoader } from "react-spinners";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const JButton = forwardRef((props: Props, ref: any) => {
  const { ...rest } = props;
  if (props.loading === undefined) {
    return (
      <button {...rest} className={`$j-button ${props.className}`} ref={ref} />
    );
  }

  return (
    <button
      {...rest}
      className={`$j-button ${props.className}`}
      disabled={props.disabled || props.loading}
      ref={ref}
    >
      {props.loading && (
        <div className="loading-content">
          <ClipLoader size={24} color="white" />
          {props.children}
        </div>
      )}
      {!props.loading && props.children}
    </button>
  );
});

JButton.displayName = "Jbutton";

export default JButton;
