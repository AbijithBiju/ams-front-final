import React from "react";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SchoolIcon from "@mui/icons-material/School";
import CallIcon from "@mui/icons-material/Call";
import HomeIcon from "@mui/icons-material/Home";
import { jsPDF } from "jspdf";
import nri from "./nri.jpg";
import application from "./application.pdf";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";



const Dashboard = () => {
  const nav = useNavigate();
  const signout = () => {
    localStorage.removeItem("access_token");
    nav("/login");
  };

  const doc = new jsPDF("p", "mm", [297, 210]);
  const [user,setUser] = useState();
  const [img,setImg] = useState();
  const [signature,setSignature] = useState();

  function toDataUrl(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

  const handleClick = async(e) => {
    e.preventDefault();
      try {
        await axios
          .get("https://ams-backend-api.herokuapp.com/user/nri/application", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          })
          .then((res) => {
            console.log(res.data.user);
            if (res.status === 200) {
              setUser(res.data.user);
              toDataUrl(res.data.user.filePhotograph,function(myBase64) {setImg(myBase64.toString())})
              toDataUrl(res.data.user.imgSign,function(myBase64) {setSignature(myBase64.toString())})
            } else {
              window.alert("Something wrong happened");
            }
          });
      } catch (error) {
        window.alert("error wrong happened");
      }
    let logo = "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gAfQ29tcHJlc3NlZCBieSBqcGVnLXJlY29tcHJlc3P/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIAGwBuwMBIgACEQEDEQH/xAAdAAEAAQUBAQEAAAAAAAAAAAAABwEEBQYIAwIJ/9oACAEBAAAAAO/gAAALOPMDfb7sNQAAAAAAAWPO2ChnVfeXJTlHfQAAAAAAA4owveNhxj0fJkY8PfoxmQAAAAAACn5ubn3hyn0JomT+OD+7JYAAAAAAAHM8Td2fnpsuybPJnJf6B+oAAAAAAARVB0F2n1Ik+TtegAAAAAAPnlea9CnykaatI23fHp81jqRgAAAAAA0ThiVMJv8Ao+o5K62jBbHgPivc1QAAAAABAWhVsNc2jSNuz2GxWyanvTqoAAAxsfyiYrDYDa9iafuCqmEieUoZzM3EQy9VRp7caFSIcjJsfx50FjNQkKtK0rSsT86/fthPXO4DKSRosfyNqnefM0b+si9GcN73HUi5KGNgyGBk7SMp64eStBx2/bdKHCPZcmcdb5Gua89C3DD7RgM7ofdXOsZzDDmp7bc3lMHmtQ95Z6h4ZuPPsnNcLfW5R/KGQi3M2ll74rK+nnYyzz1+h3OcR53tTkbSMZu+N8riWIfyuBkDqyp8+Hq+qeFza+718vun2p8+X391FPn6p8w7DmwyPMVLW6rZXlpcfdleVWd18ewAAAAAKKgAAf/EABkBAQADAQEAAAAAAAAAAAAAAAABAwUCBP/aAAgBAhAAAAAAEePMs1PQAAAGXM35W3aAAAKfBjenS0pAAAMur1eL09Rf6wBXZFfbpFXguq774eq9RZz12MWvz2d1d6WZtYs21ImZ08zQze67ePfoATEwB5OvVATE/wD/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAYBAwUCB//aAAgBAxAAAAAAHqxXODS+UAAAF386OZfPmkMAAAdC0fQ+RTqbgAAAu0zjWLkaPfO4AAlRfUqPnU9y7XzZ8ePJ88PnOjE364w+jS+rE0TYtQunzf6PriTcbPGvFMudSuGmVDkVSqMjBjOcB3tfE9GM4zj/xAA0EAACAwABBAEBBQcCBwAAAAADBAECBQYAERITFCEHEBUxUCAiIyQyMzYWQBcmMEFFVGP/2gAIAQEAAQwB/wByw2srXyOeg6n5lx8HePnReZ59hf8A26FznAv+Z706U28t7tCjwrfqTTQEgEYYJAxTytzd0aZWNMK1d4JtntYt9GrN9HF08qf5xW1a9DGQ16jFS17o8I3GYqS1KgiwOQ8UQI8XTo2vhclS3Bfwv3D/AKfzbaI9o3QHf+W4X/kaP3HB7psE4aXX5Rxi2Y6CUazZfB42HFT8qDqR2nl4184jy5xP/Lr3SbZ0GRNrX8S5WhTTzlXqfl+naw7i1NEZP6uF/wCRo9Wt41mep5vB9CCVOdUDUreGbLdq2tynanJgVYdsO3Fd+m0Ag/C/nzb/ABx77uDivTjykk/L9O5vxkxrzroj8rcL/wAjR6JMeonWP+Ce4s7Xu8eQcnLqsrfEiQru72FuphtsBPR37Nv/AC3XNv8AG3usHBa3GqjHWarrLiWCIIq+I/0/U4iqyeX801knX87nCXl/NMnGUBgz4mCSk946iJt9Kx3nJR5N3tGUFoUJcV1WqduQaxiiVTXSDRdYNRC/TCEqOl72n6T9pBe89suvbe5BTEzRt+v2EwuZm2NIKP4fWle8dd461uS5CLlc8wrFY5NrI4N1K1yQHvkkWYQTbuqFcn069lO/j5R36klI+lrRHUzER36zeUZ2o/KKUEvP6Tyhr4WFpF79rFT9WSo72+uox+O6tB9+6XGJ+OtyDT/Kfs7oUh9Fol7WiLH2eWlGJi8VTyy6G3+F0ambciVso6tkwaT35Di6GTRE7zntI1yPQS45koiPaGNDjjiOMDbO7MlBy3QV4z6/dNmv9PvNYR+RMv28lGnn+O6q5XbwPivHi7NynhqQj/SeffLKkomqsYvW7kND41x0AVS3IDIazeIOEhUsupZGjHENWKKFg+G3yFIDqWYjeeuE5btNNhg6hRdZH4xkbI70QvLKqD2hzCGTpHqHnwXm30wrJnLTlPHXhizGF17lE07yHki6eXTNtFN3iDieNmQpSTk/Et93JDx4ObfwY4y9m8TZDQckb4AxohYMhKnit/tXWqIqMNl7zTC5WruNEXXUNT9h3QTzg+91iohzvIzkH2A+RFsjlSepR03pIuLN2s7Vsf4JvbX7nN/KQYqow1EMfs6WitlqFdat2Hn83HouAXDlMeGtphyEDPnra1P+Iub/AOgz1nc4R0nVkRJHi/0+76dLcwSY14yRKGkn06+nX0+76dbe0DDUq2wO94xNgO2nZwK9x0/b2uZZ+OxKnquc/HOUg3iMDopcU9bfJM7D8Ksza5lftBTZZAvOeav3aLws9Jh0kTI+P8lX3SMVAqYcf9DmzPo4+3H/AHxiEzuN7uiK9hmzr8r1kHbr6Bfj8Y3NcN9GYOU9c9jb3nrCjbsI3JxbCdk1dR73dXFt4GFByPzWjZdkuAB479pXxFNZLLPuic9SXAm9F0mgdt0xaRp7GpyY6qeiao11dLT2oWq15u63INZCgMET38c+lo474ZU3rOdVnvSsz1y3lDw3vwbJv4X1B8l44RQx9Uk35Q/oaCmQ6YvZbhGVrB9DxWO2eyss2H0tAoWnKQgvyIiSQaDryjQWxTAQyFQhbbe0sy6h1+RWZLv8u0b/ABc/PmRFy8rk+ayLS0XL/Fwgar2lacq3izlv7afIV0yPGvd7a2z8jYBnOG61j8ix9Dwb0zfI5DyvSrKuUjbwZ1Rcl47ZNg+qSb8q2L6ePx+xPoRjdZwsXLyM+fBjTW5NigU0WdQvcvNmAcdRP41toMA5MXIvvuaxBiWc2rcfefjTa6zORsr8R0GTs3I1wemmdY2loOHLXY2FMZSzTc/Rl2D6/wCLGUn0q7HGwOBXWkVGOuf5rI9GNPtMr8X0cPRSoE6K4m2Nve5PpSplkuITdeQcdxnfnPWkqfJH8zj3yiGkrhndK6NdO/Iryy/yPUvxzIv8slGTTyo2HTUM8WEsHk7qGJqMNFseUg8t5J7XAukim1yLVy1U8SjEw42/pZJ1yq8hs1dYtzLLlvHa32jMT6s5KneetGJW4phpxWfJKv4VwMhIiYJx16+Eo9q/E9vTd66mnW+Nn3BbmtW66oYaiZ65NsX1kMXstIo5GsZbjvGAxSfXTQYb4WykFSYpgb7mWm+kkn7S8GWLbRdaikzfjr5cvZEWyslLuLlz+QtFdWkgsCeP7T8ABxyBR1vBayOTkeMCbU03X+Z6Cok07Upy8Xxmc/JBFrUzV/ioJrdT2iszPWTF9Xlwj3rPjzBRhXkDDJgzYOObj2w8BEXGYrO6FrI5GZmwemeVM62BsWlP01+zxaBJ6TxK9pwbSxyFjTLSfHgi92d4jZq9chi2py/48VmacgA1k8lu8UE2HqPP8yeVCklatOQqzGqrkh7zTl6DCG1DXpn4+xsu8tIkkkheI5Px9rLBlVrS1w6vI3X8hLOun6Q52b34CzXt+/kqM6zK2SK0+tZcaoArgr4j+0ZRq9c9ilbWA5rg08bOyaZtvlcEXXvuRZrygs/l0zzopwMpO5IyRxvE0XyMmCO1R4msxxx8pbKeVuWazGojiyQHqtvZTQMbjp6itIc3Rw7CVULxv3t8yEIeirmIg8A8y/kONJZwo6vlNTw9VoQrTHGuUt54AY4UamnlKp0+QssNAm4sQnHdp4SYuNRTqI7R2jq1KW+tqx1I6TEd6R1Na9vHxjtIRTWayOvYSwBTMjDSnRghNEQQVLxARRERAqxF6UJXwvSLVoAIhzSgqVga4BeXrBSvVaVr/TWI6+MvJPb6KeZQhLHiQVbwMIxR2GOtY6KEZI8SDraBBEKvag61iR0me80ifvgY6z3ikR0UYyV8CDraBACL+2KlOjBCaPEgqXigA0p4wKtaxWsfSsRHXrHHf9yOopWv9NYjr1079/CO5RCJXwJStoGEQo7DHWsTSnfv4R3vShI8L0i0CAEX9sVKRyU/Jl2wWxge1c+RyvkrQPxBf0D1K8r7GxEEbRn8S4zOKK7DXaXOpiLR2mO8CUXFM3GAdOoGOs94pHfq6qxLeVlxzMVisdojt0RZYlvO645t6xz2/cjqa1mPGYjtRZcU+QwDrMjpM95pHea1t+dYnrxr27dvpRVal/Oi46yUQix4kHW0DAIX9sVaR+s//8QAPBAAAgECAgUICQIFBQAAAAAAAQIDABESIQQTMUFRECIyQlJhYnEUICNQgZGhscGy4TBAc4LRBUNykvH/2gAIAQEADT8B/mRvZrV4FLfav6deKM13Nn7yQXLGpMXt3GJuaL7N1eO9dsZr8+Q7FUXNeM876VHhvC4O82yal6cJ2/uPeGjHDbtPvPwq0v6DyMmd8860p8Ea9lz1aK3aQ8eA7qtnavZ/rFRm4/walQG3A7x8Pd40mW//AGq0v6DQFGy4cKuvnR0hNW1rc+2VSg4UjjBaw33atGVAzvmXJ35eVey/WORmkYeRb3fh9vGu3LrCrS/oNYTQIKavYeINaKwaEb8Q6xqBSAYdjXq8P5q8f6xSn2su4DgO+o1CqO4e8M/aRbCTxFdqKQt9NteNSPvyd1PbEwvGpt3m1G19HRyQbdo0uxVHu1QSfhX9X9qkZVRL2vfP6UwZmbWXsFHlythGBUv09m2pg5N7CwX4VOgfALZX5OF+ThyKhcuVsthl7qMRQeb82pp5lH/FAK/03RDJJw5q3b5nKoNCKKfFJ/5SIkYue1nT6TJY3NgsYy+1a101xzyj630rRoVjxdp5Di/NTqRYX5mADLyqaN3eXrLFiIW3nUhQmPO4x7M+NNpDQxyNmQgUG/mL1YyBWuSyg8a0JoplJuSQbjBfzqCSMNYdPeR7qeXG+rQtYIN9vOkuzqiEkFxc3tWnsqlAhLrHfZapdJQmMoQ5jS26pucztG10sNopNGfAZEK85vOsZiIkRrc82vlXpjSY2jYLhj6O3yqKEm6RswxOf2qPQo4HCC5Up3VFa5VGAJAtdi2yoNYdICC5Jk3jytSgIWWNsRUHIHcKmljlnVM7KvVHG1HFM8jowOLIW/loY2c28IvSR4yz2tttu9S9sTcaQMchYthNsr1oyhpJJrAZ1DYMbEDPz5WKgRKCzc7Zs9ZOG0k7hUkoTWZEC/Go7c1dpubV/b/mpmsCcNh9fU1zRY8sPM2nyy9YyBAqWvc+dawoMdrm3l/AXpKmQXzNRKpNyCM+RxdYo82tx7hUkioDiU5sbckKYiF2nuqIKSZLdby/gylIh8TUksOjxOuRHG3zqLnO7yEEkDoqaj0GWYJIxbnLsphiXHKyBjwULWqDBMZaxXLEb8a0nVLo8atfBi57ZGp53iKXsX+A3ZUqSnVhiC7gYFy86jVEUO1xc5008uBcZCYYwfplWsYa5mO2Lff4VCLaTpOLMuxvYMdwvWFWYq5ZL71INEUMKu69Iu2xVqa5FpWYXG4hq0mAexVv9xOk1vjTxMyQhus28ir3wuLjKhqoQqCwxN5edRxgyaQqDGtxsHeadcb4JCwRuBvtpoYjMydLWSC+BajSSSZDOWyCHaKKuzSHqBtpoaWIZVaQurZ2O2vSzHFEG5nNy2cKwiW6SkrnRii17r0tY46K1Nci0rNYruOKpVeaQDivMqSATzSbSut5wA76ma1hKxKta9jfKp8aZ9H2ZsXqwZI8ZUsGNhkuQqHSokHtDstn9xWvMMTObtdgLfKpOZCjtcWG1qvZEHSduAqXSddq2zDAHMX31pKx2EcdsQbNb2HJMipfsMu6tDQOeYMwnXX81ngRGwcwdZzU08CQHWY7AXLba0yd1gx7FRMi1NJb0dZTjA42GynnlBkQ2LpHl+aTo+0IdrtbF31HJHHo2sNzjcbL8BtpWtfWmNb8FC1HEvpU98TYm6oP5opjfBIWVW7Jvtp41YjhcUXaVvhkPvWkSyaS/wAMh96l0d3/ALpch96MkWjYTlkQWNORaNDfn8RwoaJEobcx631rDI+C98gcA+1CNnc+NgDnWivEjuM8QZsRqa7h+xZdpHdUWivhv23pyYcB5pDSG16bSTNZtkiMb7ajXWNIzXtY5cnpQ0iM7mF72vUYwjeFxbWY1oWiImzrNtqOFE+QoU+lvN8FuwqVkdCeiwAAw04Jdy5soApdJE8NxzWUG4oJHCpDYizSnP6UzhATwQX/ADUQ0nSz+PvUUTyZ9pzatdDB8N9ekJPGeqwFjaoxYDbbFtZjWiwwaKDbaTmT9aZYTGbc32agYfpSG+Hbdjlc8AKTRsDuoyEhYsfnekwqXz9oYxU0Us/yNx9qeXWN4cs2+VRqFUdwqPGHt1S1s60awSRPrl31HGTCCMsWw/IcjYk6RA+VLo064zkGZ0KhaKap435pGdSLJOUGdhfCtLotnsOi7nHn50cMeMP02OV60eEBUXYGlNzRaKLLsoL/AIr0x5pABnhtgB+lPNZGxW6Z31JKsq36LpllesJd3Z7hbco7uQ7rV4VAodoXod1cCMqO4Cwo7bKBfk7WEXrxC9eEW5ODC9cALer4hevCLV4heuAGXqca8QvXBRauNd+deEWrVe0XCG51/nSZXIwKgO2w3mltDG6rm0YFulffUosbdRezy+FQK8uTiVB5OJUE15VwruUD1OIUCvEL14Rb31//xAAnEAEAAgIBBAIDAAIDAAAAAAABABEhMVEQQWGhcZFQgbEgQOHw8f/aAAgBAQABPxD/AGXuxwh7jagf+xBGhZyKLg7zKQhuwPWCII/kb48FolOypeBbGsbsPzLKRd6Mn+nRy40wj4CbU6HC/UMQEv1DzskaGFtJXyfkBVxfBwez0OrizSwczbSPaoTte0qx8XtPPu9a/qiygUV0HvUNM7M6yyXHDzyDCFr6rU+X450wLXfPKR6eLHNzAmQ7PRbdlkcxywC1cG4/SjvWFYEWRq6BX7I2fPR28Hyfa/Ho/rBLRqHdDZ08VA/6ERAZDnQtGPHe6nVDe5bZHoWIBpcKGLkwvj8rkcFoP+gaD8eg7ghFYxCU1R24XLDy6hOJuRX0nkIwK4hbP0E2IFivfNXprBYVKaqA/Gk0GrgFszCXaVTRLth+TNOBH6Eysw1SDNCR0KRtmEY2qs0JXMkmOcK7uCQDnhzM0XChgIkUfgX0XEzpIXFLQAtZTopdqdzba/ii/iza/suaq3yOe1m/+Acqv3USzXwpO17i9X86WlSv49MytQ6kBhLSqHS4b9gQ2u6FeJBU3DdkFdgYqm6KkKXINxh+2w81dtgxuZr5d7wCDTTjdha3C9o5L7qZcwg0SCfWFULmiVAor8Tn/PtmhQ7Y1/So9wKZgEdZSxQLMWsR7FgV4RbHGhTrDqNF1oY3yMNrhswv2ZCpK/2uJ+KMprkO9Y2Q32xNhxL6oV9/IzTcfZmIPtEAjCdYkYp7TBBvoKN6sV5GEafe6sURV4QQYBK0f6wzAHsmAX3Y4TbG5SmTllkslnMPs5KbeQOWLTchdMGvfBD9Q8KX4XiAl4Lub0CC+lkeXHArrANXLEuWc9bOYjo5gW5QHdWZgudT7qygUHDeZC+i/ATrKVWoyKsmJjqoqfc527twB8Sg9o2dnQA7JmoOwgvccQwWEqQlpZxFHFkoNEs5lnP+AWp7UtFg0R35uroUnQShhgmlrQgyXJ6NApLju8VjRoeWUDFmi2oLPEs56Wc9LOelnPQD2v1hr6IscQLQjZ8Ss4jaTcgD3SJXcuNlqEyQ+YJo4b0DKWG1h3pSyFDRHNwvxFgCLxlTGsqiCklPf5yvTCBFkRQa0oZtXGil7a0aRvCTOceSYFmTese2lqMr9SCkAIVk1TEa6a8q1wjuBuZiKXbvnhGbk+coBDagAw3rCjGLudsQrXdcn/jLKoesBtjFhifqa0glTpnWw+BuKDtC7QGw5gSH5UY9tNLdEBYTSu1hN5sTa+LppbLojNUie2DZqo8tkIaN8Uw8pk0lHB3DENDDWTwtwxxoBaIfOBf5zupGCRQmjAuhG1wQaCFANymcS20ke8hhnPW6i8VYmM7Xd6XliNbbSjQRcAZYN00BDc7X0GhVdMJfjoFX4GWThMd+6rs3C7+vHOyYdlJVrP22ERMWiIpSAumYA4U2UuofCozO5fmTXmHGrWF8xWRbRbDb9SshVskRcvG2j5ZCx5mI5hPBuBOKYOOTaCeUDAiUihsFjjJVqeB2TZ+hESSQGVf4iaouK56jTwR8v79b9sKxZTVLUFRFfTrkcp0btDwzEYDJ9mIk3PKWqsVi41uk640IDIC4nCaraUS4/QEVUDnTXGOwR5AWIZUDurKl2zMGuKORqJDqK5AdaErwCvc1r5aIYxQ98mMuhgLFO7ejUyUrGGzlv1G1IiXJY3wEjVAzwVUPa8pQgMGCVwgoqrv3C3t1nA/1CjVQRM44o2qV/ay5xHCbc+KqL4+5o0VBQQFzBqvbTN1Ww5yFMNzdU3FkAApdJVBSF4NEqKcvAAAsADaQO1w+f5Zg+TwNAA/kFEHqfvYaIdt3GzCKCa34sQKqC2RwoPy/ogqTwQXP5kTQqGAX+AggPfcv0ZaVg7ppEly8NpWyqGUFjBlIjunDKAcQyQQBcXKnloVLICzqBu19xeAWBFzTgi8XfKr24N1KOJtSlar6ZYWXYIwACgKCKWXyDAhJgCMRRScUxO8QTCPyRE87bD6ixwwCfcC5NACg4It15SfozbgE+TkJfk8ftCpZ5DdARyBtfcfmECbhHueLFAPXTwdKD3O6lqQ9S7i5QXrcNHcAi7gMB7liGeEeoEOslI9wRfl1AfqApTuBRDEDZTQaja8xQE8q7wLmVFaAe542GR6i70tdgj1P2ED+mGN77CH6mTaBDviU0mwFkarK1UgTyBAWyVCKjZbYeg9HhkKRLGJRXao/UAG9idHkNCPthQYNAVAf/P2DEAXAowwR21WrFlTzklj1LtPKhhwVHJcCrJxrEdbXtk8JSAe4UnFhHr81/8QALhEAAgIBAwIFAgUFAAAAAAAAAQIDEQAEEiETMQUQIkFRcYEUIzBAYSAkNEJy/9oACAECAQE/AP0yQASTQGPq2ZS2mhMoBq+wvH8T1aMQY1U/BGQeIauQ8QBx/HGJqFZhHICkhF7W/ceKyOsKKvAZuc8K/wAZv+zkg0+vRwDyhHqyKSCOQaVOCBwM8VYrqY2U0QgyBi8UTt3Kgn9vPAmojMb/AGPwciEmgiaNoWkBYkMmdeVUaJRtBNkgcnINTI2ojleIuVBB2jk4+lOsmSaVCiBQNp7nAABQ/ba/UTROiwtVKWb6XWNq5W1KBHqHn77RZz8d+VDIIiTK20LePrZ2imfpgesKh4NH4xNcIzIk0JUooP1vBrwrMs0RT0bxzdjBr2Bp4CNyF057gZo5pZ4t8qVZ4I9x+m0saukbMAzdh5EhQSSABnWiDKu8WwsfTFZWAZSCPkYzqgt2AH8+ZYKCxNAdziTxOjSI9qvc450k8kn9z6pFCAV2z8BH6ac0Iyg+/vg0kcDacy6ljtNIpxPD1UKpmYqJN4FZJoUlM7M5uSvtWNoowkrTzMxK0XPsBkejRk3tM0m6PYrdqXNPD0Ilj3lq9z5jUwmToiQF/jHdI1LuwVR7nIpopgTG4YDDIgdYy3qbsP6dWxOqlcX+VCQPqc2tE+lJlezGWckk0MPME5JdiHA32aIOOBUwjZzHHEtcnucikSCTS0z9Pplj35Y4bkEDys9SSsTyeBg6sszIZSrBwqAlrAGa95I4V2EgFgGYdwMkvp6kxtIYTtC2Tyc08KxQLH345vnGLCLUzotb5toNdhjGWOFnSYmN2VSV3Hb8986ccs2miidzHRcsSbyPqMIoldwHnNGzYUYTLENSEd+n1QhPJIGOzBdQIi5hYqq3Zs5ITc0bs4dNqxKt5LK9yJqWcFIwFAsAtXc4WmgOnCsxMsNDn3OOX0ukJW3dV7nnk5pZWjnCIVcSkEsRVH3zxAwmHpyuVvlSBfIzryNHpll3RxkkMyiiQMkZ0eUwM5WOIbSb/wBvfAZFhkkSYncqqQC17j7846ywTHpu7FYLayTzhcrpupFJIZGIWQm+LzQIwEjiXcjEUOeCPrlDKGUKqhlD4yh8DKHxlC7rnyodq8qHasoVVCsofGUMoZQ+MoXdZLpBMxLyvtJspfGJpEWXqszMRwt9l+nlQHsMIB7jKB9soZQ+B5UO1Dy//8QAMxEAAgIBBAECBAMHBQEAAAAAAQIDBBEABRIhQQYxExQiURBhcRUjJDBAobEWIDNCU5L/2gAIAQMBAT8A/lojOyoilmY4AHZJ1BsMUUsce830pM6hxGQWfB+/gaq+jNiniWSO3LOp/wCyuMf21ufpPYaaZfdGrN4EhDas7TNFC9utItmor8TNGDgH8wex/UehasE+5TzSgF4YgUB+7HGdeuhneYgPNZP8nVN929LzwSSIQk8ZzF3g9f5GrlTc7dVt7sZkjd+3OevHnxr0PGkuz245FDI07BgfYgqNbjDHWv3IIjmOOZ1X9Af6fbNysbVbjt1yOQ6ZT7Mp9wdXmp+qL0FuK/DVdYkRop8g5Bz0fY6/ZtKe0l6WQzMqcUVn5RrkYJUfnrc9npxbRbowXlgjldWUTSfQmGyQuq++JsG3WNuozpYsSSFvjICEQEAdZ9zpiWYsxJJOSf6b0ttO33a9ibcIefOYQw9kfVxLH21FsFCLZrBng5Xzx45J+gzNxQaHpr+O3Go11QlOESyS8DjsZxjVf05t0N3b63zkkjfAaadCWUFcdN1jA1Y9MNaFWehfSdLM7oOmCoBkns+4GNP6VaWKKXbbyWQbHwH+koFbyfzA0fSsbIXg3RJBFZWvP9BHBmOOvvr1Ft9HbLorUpy/FQJFb3Vv1/P+XFStTV57cULNBDj4j+Fz+CI8jqkaMzscBVGSTobfdaOaUVn4ROEf7hj4xqWKWFzHNGyOPdWGCNRQTTtwhieRsE4UEnA8/jHG8rpFGhZ2ICqPck6n2y9VsRVZ65WeXHBMgk5OPB1WXftrq0h+yCIqcslhmLD6yVI778DX+qLREvKBC0lxLTEk98PZP0GNPv8Ac3KHdRT2iNfixh7EisSQq+TnU/qySVpZV2+NJpKprFwxzg6qeprNJNtihrpwqBwQSf3nP3zqH1HcezSg2uhHEizF1gQk/Ed+jknVz1DZgnFePboqojtCeaIEsXlBz9R1ut8bpdkuiusJcDkqknJHn8W2jckp/PvUda2AeZwOjqvWntyrBWiaSVvZVGTq7t13bmRLsBiZxlQSDkD9NJTsyV5baREwRkB38An/AG7FAq7JQgbj/G7grOD/AOcfZz/86+NDdrb4iUKpRbSQQIFVS7ZAOTpAE3XbVEdaJGru/wAAonxI2UAdMNVnYHbjbirratX5DJ9KdLGD/frV6pPuVTesw1/mjbWJD9AKxKQck/odIVqvulehFX51aMSp9Kgs5BJJPkaf5Kht0FpaKzwSV2knZFi4s7jzy7GCegNela1a1uE5njR2jgd4YnI4s/gd6q8fmtmFyGsu4qs0k3BVHCMDr2863XcJb+5TW+kbmQnAcegej151GkL3tn22zLzFfbzIUL9SSHAwfvqNKNzcIa9mgq2q8EkqLKI1EhJwoITrrQu26W37zdu1qy2i0dZYkVeB89ge/vq58pA129NVrM9fbYwV4LxaWQ59tRxUbrbObNasbQovOIwqqrOccQRqtHG0+0Nejrx7jAJp5RGFXigBCg8dVI0K7dbghrPWs/FnvzSBSe++PeqNGsVpz7NDWZJ7btO7hWZIgxwqhtJDt25pupljhjjp7hzZggH7uMdjoecarCvve/oJuMFeWQ4VcLhVHS/qdb1RhtbY89lZa/yUckaQpIG5oCAhP5a9KLfTcDbowLKIwFlUsFPB/tnQ22pFc3eaiY7VuNEaGGZgyxs/Z99VoK9iCgm5x11mt3naUKFAxEMBevBI0y1ZdwqU59vCfDlknV3WIL8JARxHHxk+dQSUdz26P5uvWiim3IRxcFCkIDn++MaWssu8/J3qdRKsSPLUjQIC/HoZ16osRu1SuabQ2I1YuzCMFlb2/wCPXJhjDHrQZh7MdfEfPMu3L7571zbo8jkd++viP39bd+/Z71zcEkOcno965tjhyPH7Z60CVOQSCPI1ybPLkcnzn8OTZ5cjkec65vnnzbl9896LMfdifPvrkx92OuTdHkcj271yYkkscnznQdscQx4/bPWqW/ybfCiV6FUTopVZypL96sb7YmpNRjhigjchpjGMNKw8sfwLu2cux8dnSuydqxH6HGg7qSVYgnyDrk3X1HXNycl2J+5OsnAGTjRkckMXbI9jnRYscsST9zr/2Q=="
    doc.setFontSize(15);
    doc.rect(8, 8, 194, 282); //border
    doc.addImage(logo, 'JPEG', 15, 12, 80, 18)
    doc.addImage(img,'JPEG', 160, 45, 35, 40)//photo goes here
    doc.rect(8, 8, 194, 25); //small box
    doc.text(120, 20, "Varikoli P.O, Puthencruz - 682308");
    doc.text(155, 28, "Ernakulam - Kerala");
    doc.text(60, 40, "Application for B-Tech NRI Quota 2023"); //Update year
    doc.rect(8, 8, 194, 80);
    doc.setFont("times", "bold");
    doc.text(12, 50, "Application No : ");
    doc.setFontSize(30);
    doc.setFont("times", "normal");
    doc.text(12, 65, user.applicationNo ); // user.applicationNo goes here
    doc.setFontSize(15);
  
    doc.setFont("times", "bold");
    doc.text(12, 95, "Personal Details : ");
    doc.setFont("times", "normal");
    doc.rect(10, 98, 190, 10 * 11); //presonal details small box
    doc.rect(10, 98, 90, 10 * 5); //presonal details partition
    for (
      let i = 0;
      i < 16;// i => no of rows
      i++ 
    )
      doc.rect(10, 98 + 10 * i, 190, 10);
  
    doc.text(12, 95 + 10 * 1, "1.Name of applicant : ");
    let name = ''
    if(user.middleName){
      name = user.firstName + ' ' + user.middleName + ' ' + user.lastName
    }else{
      name = user.firstName + ' ' + user.lastName
    }
    doc.text(102, 95 + 10 * 1,name); //user.fName+user.mName+user.lName
  
    doc.text(12, 113, "2.Date of Birth : ");
    doc.setFontSize(10);
    doc.text(12, 117, "(age proof to be attached)");
    doc.setFontSize(15);
    let dob = new Date(user.dob)
    console.log(dob.toLocaleDateString('en-GB'))
    doc.text(102, 95 + 10 * 2, dob.toLocaleDateString('en-GB') ); //user.dob
  
    doc.text(12, 95 + 10 * 3, "3.Name of the parent/guardian : ");
    doc.text(102, 95 + 10 * 3, user.guardianDetails.name.toString()); //user.guardian.name
  
    doc.text(12, 95 + 10 * 4, "4.Occupation of the parent/guardian : ");
    doc.text(102, 95 + 10 * 4, user.guardianDetails.occupation.toString()); //user.guardian.occupation
  
    doc.text(12, 95 + 10 * 5, "5.ADDRESS :"); //user.permanentAddress
    doc.text(40, 95 + 10 * 6, user.permanentAddress.addressL1.toString());
    doc.text(40, 95 + 10 * 7, user.permanentAddress.city.toString());
    doc.text(40, 95 + 10 * 8, user.permanentAddress.district.toString());
    doc.text(12, 95 + 10 * 9, "State :");
    doc.text(30, 95 + 10 * 9, user.permanentAddress.state.toString()); //user.address.state
  
    //doc.text(12,95,'Pin');
    doc.text(107, 95 + 10 * 9, "Pin :");
    doc.text(120, 95 + 10 * 9, user.permanentAddress.pincode.toString()); //user.address.pin
  
    doc.rect(10, 98 + 90, 90, 10 * 7); //presonal details partition
    doc.text(12, 95 + 10 * 10, "6.Email : ");
    doc.text(102, 95 + 10 * 10, user.email); //user.email
  
    doc.text(12, 95 + 10 * 11, "7.Phone No(Kerala): ");
    doc.text(102, 95 + 10 * 11, user.phone.toString()); //user.phoneK
  
    doc.text(12, 95 + 10 * 12, "8.Phone No(alternate): ");
    doc.text(102, 95 + 10 * 12, user.phone.toString()); //user.phoneM
  
    doc.text(12, 95 + 10 * 13, "9.Name of sponsor :");
    doc.text(102, 95 + 10 * 13, user.NRIdetails.name.toString()); //user.sponser
  
    doc.text(12, 95 + 10 * 14, "10.Relation with applicant :");
    doc.text(102, 95 + 10 * 14, user.NRIdetails.relation.toString()); //usre.relation
  
    doc.text(12, 95 + 10 * 15, "11.Selected Branch :");
    doc.text(102, 95 + 10 * 15, user.bp1.toString()); //user.bp
  
    doc.text(12, 95 + 10 * 16, "12.Transaction ID :");
    doc.text(102, 95 + 10 * 16, user._id.toString()); //user.transactionId
    doc.setFontSize(10);

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    doc.text(70, 288, "This file was generated on " + today);
    doc.text(95, 295, "page 1"); //page No
  
    //New Page
    doc.addPage();
    doc.setFontSize(15);
    doc.rect(8, 8, 194, 282); //border
    doc.addImage(logo, 'JPEG', 15, 12, 80, 18)
    doc.rect(8, 8, 194, 25); //small box
    doc.text(120, 20, "Varikoli P.O, Puthencruz - 682308");
    doc.text(155, 28, "Ernakulam - Kerala");
    doc.setFont("times", "bold");
    doc.text(80, 45, "UNDERTAKING");
    doc.text(12,55,'GROUP A')
    doc.setFont("times", "normal");
    doc.setFontSize(12)
    doc.text(12,60,'I am aware about the criteria followed by "Muthoot Institute of Technology and Science", for the \nB-Tech NRI Quota admission for the year 2023, such that my ward has to attain 75% Marks for \nMathematics individually and 75% put together in Physics, Chemistry & Mathematics, in the 12th \nstadard, for Qualifying examination(CBSE/ISC) OR attain 75% Marks for Mathematics individually \nand 75% put together in Physics, Chemistry & Mathematics, in the 12th stadard(Terminal-evaluation \nTE), for Qualifying examination(State Board). If my ward failed to do so, there is no claim, from my \nside for the admission')
    doc.setFontSize(15)
    doc.setFont("times", "bold");
    doc.text(12,100,'GROUP B')
    doc.setFont("times", "normal");
    doc.setFontSize(12)
    doc.text(12,105,'I am aware about the criteria followed by "Muthoot Institute of Technology and Science", for the \nB-Tech NRI Quota admission for the year 2023, such that my ward has to attain 70% Marks for \nMathematics individually and 70% put together in Physics, Chemistry & Mathematics, in the 12th \nstadard, for Qualifying examination(CBSE/ISC) OR attain 70% Marks for Mathematics individually \nand 70% put together in Physics, Chemistry & Mathematics, in the 12th stadard(Terminal-evaluation \nTE), for Qualifying examination(State Board). If my ward failed to do so, there is no claim, from my \nside for the admission')
    doc.setFontSize(15)
    doc.setFont("times", "bold");
    doc.text(12,145,'EXIT OPTION')
    doc.setFont("times", "normal");
    doc.setFontSize(12)
    doc.text(12,152,'A student can opt to EXIT from NRI quota before 5 days, after the publication of KEAM 2023 \nSCORE and will be reimbursed with the entire amount after deducting Rs 1000 as processing fee. \nHowever, a student will be automatically considered for MITS Management Merit Quota from NRI \nquota if he desires so and has to freeze the registration in MITS by sending an email to \nadmissions@mgits.ac.in . Request for exit should be mailed to admissions@mgits.ac.in within the \nstipulated time. There after the registered choice will be frozen and will not be eligible for any refund, \nif the admission is cancelled after 5 days from the date of KEAM SCORE publication.')
    doc.setFontSize(15)
  
    doc.text(12, 85 + 10 * 11, "Name of the parent/guardian : ");
    doc.text(150,85+(10*12),'Signature of student')
    doc.addImage(signature, 'JPEG', 150, 210, 40, 25)
    doc.text(85, 85 + 10 * 11, user.guardianDetails.name.toString()); //user.guardian.name
  
    doc.text(12, 85 + 10 * 12, "Date : ");
    doc.text(30, 85 + 10 * 12, today); //date of application
  
    doc.setFontSize(10);
    doc.text(70, 288, "This file was generated on " + today);
    doc.text(95, 295, "page 2"); //page No
    doc.save("MITS_application");

    let pdf = doc.output('blob')
     

    const formData = new FormData();
    formData.append("filePreview",pdf)

    await axios.patch('https://ams-backend-api.herokuapp.com/user/nri/preview/'+localStorage.getItem('user_id'),{
      filePreview : pdf
    },{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        'Content-Type': 'application/pdf',
      },
    }).then(res => {
      console.log(res)
    })
  };

  return (
    <div className="w-screen overflow-x-hidden h-screen bg-slate-200">
      <div className="w-full relative bg-white h-[140px] sm:h-[230px]">
        <img
          src="https://th.bing.com/th/id/R.4b016087bef1cdb837ae3cf6a366de59?rik=u5ZKGPBtamCH2w&riu=http%3a%2f%2fmgmits.ac.in%2fwp-content%2fuploads%2f2019%2f05%2fmits.jpg&ehk=8%2b0FtsP83SD2uVTuQmjohvP5frJoWmAcW8lB8%2f7nJ8g%3d&risl=&pid=ImgRaw&r=0"
          alt=""
          className="w-screen h-full object-cover "
        />
      </div>
      <div className=" m-8 lg:absolute top-24 right-10 rounded-md bg-gray-100 shadow-2xl h-auto w-auto">
        <div className="w-full h-3/5 rounded-md flex pt-8 items-center justify-center ">
          <div className="w-44 h-44 rounded-full border-[3px] border-black">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
              alt=""
              className="object-cover h-full rounded-full w-full"
            />
          </div>
        </div>
        <div className="w-full p-4 rounded-md h-2/5 ">
          <p className="text-center font-bold text-lg uppercase ">
            Marc Benedict
          </p>
          <div className="w-full font-semibold text-center text- italic h-auto py-6">
            Dob:&nbsp;&nbsp;12/02/2001
            <br />
            dhjgchx@gmail.com
            <br />
            Ph1: 8923-398-329
            <br />
            Ph2: 4923-598-129
          </div>
          <div className="flex space-x-2 items-center justify-center w-full h-auto">
            <button
              onClick={signout}
              className="w-32 h-12 mr-2 font-bold rounded-md border-[2px] border-black hover:bg-gray-300"
            >
              Sign Out
            </button>
            <button
              onClick={handleClick}
              className="w-32 text-white text-center h-12 rounded-md bg-gray-800 hover:bg-gray-700"
            >
              Print
            </button>
          </div>
        </div>
      </div>
      <div className="xl:w-4/6 lg:flex lg:space-x-8 lg:space-y-0 space-y-4 lg:p-8 m-8 h-auto">
        <div className="xl:w-1/2 p-8 space-y-2 shadow-xl bg-white rounded-md">
          <div className="w-full flex items-center space-x-3">
            <SupervisorAccountIcon />
            <p className="text-2xl sm:text-3xl mb-2 ">Parental Details</p>
          </div>
          <p className="text-lg font-light mb-2 italic ">
            {" "}
            Parent/Gaurdian: <b>Benedict</b>
            <br />
            Occupation: <b>Advocate</b>
            <br />
            Relation with Applicant: <b>Father</b>
            <br />
            NRI Sponsor: <b>Nil</b>
          </p>
          <div className="w-full flex items-center space-x-3">
            <HomeIcon />
            <p className="text-2xl sm:text-3xl mb-2 ">Permanent Address</p>
          </div>
          <p className="text-lg font-light italic ">
            {" "}
            123 Main Street, New York, NY 10030
            <br />
            City, District, State, pin: 364378
          </p>
        </div>
        <div className="xl:w-1/2 p-8 shadow-xl bg-white rounded-md">
          <div className="w-full flex items-center space-x-3">
            <CallIcon />
            <p className="text-2xl sm:text-3xl mb-2 ">Contact Address</p>
          </div>
          <p className="text-lg font-light italic ">
            {" "}
            123 Main Street, New York, NY 10030
            <br />
            City, District, State, pin: 364378
          </p>
          <div className="w-full flex pt-8 items-baseline space-x-3">
            <SchoolIcon />
            <p className="text-2xl sm:text-3xl  ">Course Details</p>
          </div>
          <p className="text-lg font-light mt-2 italic ">
            {" "}
            Course: <b>B-Tech</b>
            <br />
            Quota: <b>NRI</b>
            <br />
            Branch Opted: <b>Computer Science (waiting list 1)</b>
            <br />
            Academic Year: <b>2021-2025</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
