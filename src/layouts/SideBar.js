import React from "react";

import Filter from "./Filter";
import {  Container} from "semantic-ui-react";
export default function SideBar() {
  return (
    <div>
      <Container textAlign="left">
      <Filter />
      </Container>
    </div>
  );
}
