import React from 'react';
import { useReducer } from "react"
import { Card, Button } from '@nextui-org/react';
import "./style.css"
const Popup = () => {
  const [count, increase] = useReducer((c) => c + 1, 0)
  return (
    <Card>
     
    </Card>
  );
};
export default Popup;