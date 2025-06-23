import React from "react";

type ListboxWrapperProps = {
  children: React.ReactNode;
};

export const ListboxWrapper: React.FC<ListboxWrapperProps> = ({children}) => (
  <div className="w-full">
    {children}
  </div>
);