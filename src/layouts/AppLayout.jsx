import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "@/Header/MainHeader";
import MainFooter from "@/Footer/MainFooter";
import ScrollToTop from "../helpers/ScrollToTop";
export default function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <MainHeader />
      <Outlet />
      <MainFooter />
    </>
  );
}
