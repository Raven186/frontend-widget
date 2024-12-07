import React from "react";
import { isMobile } from "react-device-detect";
import MobileExchangeWidget from "./MobileExchangeWidget";
import DesktopExchangeWidget from "./DesktopExchangeWidget";

const ExchangeWidget: React.FC = () => {
  return isMobile ? <MobileExchangeWidget /> : <DesktopExchangeWidget />;
};

export default ExchangeWidget;
