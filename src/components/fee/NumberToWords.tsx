import React from 'react';

interface NumberToWordsProps {
  number: number;
}

const NumberToWords: React.FC<NumberToWordsProps> = ({ number }) => {
  const convertToWords = (num: number): JSX.Element => {
    const single: string[] = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const double: string[] = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens: string[] = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const formatTenth = (digit: number, prev: number): string => {
      return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit]);
    };

    const formatOther = (digit: number, next: number, denom: string): string => {
      return (0 != digit && 1 != next ? " " + single[digit] : "") + (0 != next || digit > 0 ? " " + denom : "");
    };

    let res = "";
    let index = 0;
    let digit = 0;
    let next = 0;
    let words = [];

    if (num.toString() === "NaN" || parseInt(num.toString()) > 0 && num.toString().length <= 10) {
      for (index = num.toString().length - 1; index >= 0; index--) {
        digit = parseInt(num.toString()[index]);
        next = index > 0 ? parseInt(num.toString()[index - 1]) : 0;
        const numLength = num.toString().length - index - 1;

        switch (numLength) {
          case 0:
            words.push(formatOther(digit, next, ""));
            break;
          case 1:
            words.push(formatTenth(digit, parseInt(num.toString()[index + 1])));
            break;
          case 2:
            words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != parseInt(num.toString()[index + 1]) && 0 != parseInt(num.toString()[index + 2]) ? " and" : "") : "");
            break;
          case 3:
            words.push(formatOther(digit, next, "Thousand"));
            break;
          case 4:
            words.push(formatTenth(digit, parseInt(num.toString()[index + 1])));
            break;
          case 5:
            words.push(formatOther(digit, next, "Lakh"));
            break;
          case 6:
            words.push(formatTenth(digit, parseInt(num.toString()[index + 1])));
            break;
          case 7:
            words.push(formatOther(digit, next, "Crore"));
            break;
          case 8:
            words.push(formatTenth(digit, parseInt(num.toString()[index + 1])));
            break;
          case 9:
            words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != parseInt(num.toString()[index + 1]) || 0 != parseInt(num.toString()[index + 2]) ? " and" : " Crore") : "");
        }
      }
      res = words.reverse().join("");
    }

    return (
      <div>
        <h1 style={{ color: "black", fontWeight: "bold",fontSize:"1rem" }}>Rupees in words: <span  style={{ color: "black", fontWeight: "normal",fontSize:"1rem" }}>{res}</span> </h1>
      </div>
    );
  };
  return convertToWords(number);
};
export default NumberToWords;