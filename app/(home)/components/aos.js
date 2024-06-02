"use client";
import Aos from "aos";
import { useEffect } from "react";

function AosInit() {
  useEffect(() => {
    Aos.init();
  }, []);
}

export default AosInit;
