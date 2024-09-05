import React from "react";
import Image from "next/image";
import drait from "@/assets/full_logo-wide.png";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-white from-25% via-blue-500 to-purple-600 flex items-center justify-between px-4 py-2">
      <div className="flex-start">
        <Image src={drait} width={400} height={500} alt="drait logo wide" />
      </div>
      <div className="text-white font-bold text-3xl">Faculty Details</div>
    </header>
  );
};

export default Header;