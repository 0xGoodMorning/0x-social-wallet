import React, { useState } from "react";
import { useTheme } from "@chakra-ui/react";

const rotateAnimation = `
  @keyframes rotate {
    0% { transform: rotate(0deg) translate3d(0, 0, 0); }
    25% { transform: rotate(3deg) translate3d(0, 0, 0); }
    50% { transform: rotate(-3deg) translate3d(0, 0, 0); }
    75% { transform: rotate(1deg) translate3d(0, 0, 0); }
    100% { transform: rotate(0deg) translate3d(0, 0, 0); }
  }
`;

const stormAnimation = `
  @keyframes storm {
    0% { transform: translate3d(0, 0, 0) translateZ(0); }
    25% { transform: translate3d(4px, 0, 0) translateZ(0); }
    50% { transform: translate3d(-3px, 0, 0) translateZ(0); }
    75% { transform: translate3d(2px, 0, 0) translateZ(0); }
    100% { transform: translate3d(0, 0, 0) translateZ(0); }
  }
`;

const hoverBgColor = `
  @keyframes bgColorFade {
    0% { background-color: #ffffff; }
    100% { background-color: #e9f6fe }
  }

  @keyframes bgColorFadeOut {
    0% { background-color: #e9f6fe; }
    100% { background-color: #ffffff; }
  }
`;

const disabledSpanStyles = `
  .disabled-span span {
    color: rgba(22, 76, 167, 0.3) !important;
  }
`;

const hoverStyles = `
  ${rotateAnimation}
  ${stormAnimation}
  ${disabledSpanStyles}
  ${hoverBgColor}

  .hovered {
    background-color: rgba(29,161,242);
    animation: rotate 0.7s ease-in-out both, bgColorFade 0.1s linear both;
  }

  .hovered span {
    animation: storm 0.7s ease-in-out both;
    animation-delay: 0.06s;
    color: #1DA1F2 !important;
  }

  .not-hovered {
    animation: bgColorFadeOut 0.3s linear both;
  }
`;

const Button = ({ children, disabled, ...rest }) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  const buttonStyles = {
    marginTop: "var(--chakra-space-4)",
    position: "relative",
    outline: "none",
    textDecoration: "none",
    borderRadius: "50px",
    cursor: "pointer",
    textTransform: "uppercase",
    height: "50px",
    paddingLeft: "30px",
    paddingRight: "30px",
    opacity: 1,
    backgroundColor: "#ffffff",
    border: "1px solid #1DA1F2",
    borderColor: "#1DA1F2",
    fontSize: theme.fontSizes.sm,
  };

  const disabledButtonStyles = {
    ...buttonStyles,
    backgroundColor: "#f0f0f0",
    borderColor: "rgba(22, 76, 167, 0.3)",
    cursor: "not-allowed",
  };

  const spanStyles = {
    color: "#1DA1F2",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    letterSpacing: "0.7px",
  };

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <style>{hoverStyles}</style>
      <button
        style={disabled ? disabledButtonStyles : buttonStyles}
        className={`${isHovered ? "hovered" : "not-hovered"} ${
          disabled ? "disabled-span" : ""
        }`}
        onMouseEnter={disabled ? null : onMouseEnter}
        onMouseLeave={disabled ? null : onMouseLeave}
        disabled={disabled}
        {...rest}
      >
        <span style={spanStyles}>{children}</span>
      </button>
    </>
  );
};

export default Button;
