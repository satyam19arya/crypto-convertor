import React, { useEffect, useState } from 'react'
import {Card, Form, Input, Select} from 'antd';

const Convertor = () => {

  const defaultFirstSelectValue = "Bitcoin";
  const defaultSecondSelectValue = "Ether";

  const [cryptoList, setCryptoList] = useState([]);
  const [inputValue, setInputValue] = useState("0");
  const [firstSelect, setFirstSelect] = useState(defaultFirstSelectValue);
  const [secondSelect, setSecondSelect] = useState(defaultSecondSelectValue);
  const [result, setResult] = useState("0");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(){
    const response = await fetch('https://api.coingecko.com/api/v3/exchange_rates')
    const jsonData = await response.json();

    const data = jsonData.rates;
   // console.log(Object.entries(data));   convert object into array(with two parts)

    const tempArray = Object.entries(data).map(item =>{
      return{
        value: item[1].name,
        label: item[1].name,
        rate: item[1].value
      }
   })
      
     setCryptoList(tempArray);
  }

  useEffect(() => {
    if(cryptoList.length == 0) return;

    const firstSelectRate = cryptoList.find((item) => {
       return item.value === firstSelect
    }).rate;

    const secondSelectRate = cryptoList.find((item) => {
      return item.value === secondSelect
   }).rate;

   const resultValue= (inputValue * secondSelectRate)/ firstSelectRate;
   setResult(resultValue.toFixed(5));

  }, [inputValue, firstSelect, secondSelect])

  return (
    <div className="container">
        <Card className="crypto-card" title={<h2 style={{textAlign: 'center'}}>Crypto Convertor</h2>}>
          <Form>
            <Form.Item>
              <Input onChange={(event) => setInputValue(event.target.value)}/>
            </Form.Item>
          </Form>
          <div className="select-box">
            <Select style={{width: '170px'}} defaultValue={defaultFirstSelectValue} options={cryptoList} onChange={(value) => setFirstSelect(value)}/>
            <Select style={{width: '170px'}} defaultValue={defaultSecondSelectValue} options={cryptoList} onChange={(value) => setSecondSelect(value)}/>
          </div>
          <p style={{textAlign: 'center' , marginTop: '20px'}}>{inputValue} {firstSelect} = {result} {secondSelect}</p>
        </Card>
    </div>
  )
}

export default Convertor