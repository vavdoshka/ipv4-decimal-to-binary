import './App.css';
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import binaryIp from 'binary-ip';

function randomIpv4() {
  return Math.floor(Math.random() * 256) + "." + Math.floor(Math.random() * 256) + "." + Math.floor(Math.random() * 256) + "." + Math.floor(Math.random() * 256);
}

function generateLightColorRgb() {
  const red = Math.floor((1 + Math.random()) * 256 / 2);
  const green = Math.floor((1 + Math.random()) * 256 / 2);
  const blue = Math.floor((1 + Math.random()) * 256 / 2);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}


function checkIpv4BinaryToDecimalMatch(e, ipv4, ipv4Binary) {
  e.preventDefault();
  const challengeIpv4Binary = binaryIp(ipv4);
  return challengeIpv4Binary === ipv4Binary;
}

function resetState(setIpV4, setIpV4Binary, setCheckStatus, setIpv4Color, setIsClicked) {
  setIpV4(randomIpv4());
  setIpv4Color(generateLightColorRgb());
  setCheckStatus(true);
  setIpV4Binary("");

  setIsClicked(false);
}


function App() {

  // set random IP on page load with hook
  const [ipv4Decimal, setIpV4] = React.useState('')
  const [ipv4Binary, setIpV4Binary] = React.useState('')
  const [checkStatus, setCheckStatus] = React.useState(true)
  const [ipv4Color, setIpv4Color] = React.useState('')
  const [isClicked, setIsClicked] = React.useState(false)

  useEffect(() => {
    setIpV4(randomIpv4());
    setIpv4Color(generateLightColorRgb());
    setCheckStatus(true);
  }, [])


  return (
    <div className="App">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "40vh" }}>
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Row>
            <Col>
              <h1>IPv4 Decimal to Binary Test</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ paddingTop: "20px" }} />
              <p>Test your IPv4 decimal to binary conversion skills.</p>
              <p className="d-flex justify-content-center align-items-center" style={{
                backgroundColor: ipv4Color,
                fontSize: "20px",
              }}>{ipv4Decimal}</p>
              <div style={{ paddingTop: "20px" }} />
            </Col>
          </Row>
          <Row>
            <Col>
              <form style={{ paddingBottom: "20px" }} onSubmit={(e) => {
                setIsClicked(true);
                setCheckStatus(checkIpv4BinaryToDecimalMatch(e, ipv4Decimal, ipv4Binary));
              }} >
                <div className="mb-3">
                  <input onChange={e => {
                    setIsClicked(false);
                    setIpV4Binary(e.target.value)
                  }
                  } type="search" value={ipv4Binary} placeholder="00000000.00000000.00000000.00000000" className="form-control" id="decimalAddress" aria-describedby="decimalAddressHelp" />
                  <div id="decimalAddressHelp" className="form-text">Enter an IPv4 address in binary format</div>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
              </form>
            </Col>
          </Row>
        </div>


      </Container>
      <Container className="d-flex justify-content-center align-items-center">
        <div className="w-100" style={{ maxWidth: "500px" }}>

          <Row>

            <Col>

              {isClicked && (ipv4Binary === "" || ipv4Binary.split(".").length !== 4) ?
                <div className="alert alert-danger" role="alert" >Please enter an IPv4 address in binary format</div> : null}
              {isClicked && ipv4Binary !== "" && ipv4Binary.split(".").length === 4 && checkStatus ?
                <div className="alert alert-success" role="alert">Correct!</div>
                : null}
              {isClicked && ipv4Binary !== "" && ipv4Binary.split(".").length === 4 && !checkStatus ?
                <div className="alert alert-danger" role="alert" >Correct answer is {binaryIp(ipv4Decimal)}</div>
                : null}
              {isClicked && ipv4Binary !== "" && ipv4Binary.split(".").length === 4 ?
                <button onClick={() => {
                  resetState(setIpV4, setIpV4Binary, setCheckStatus, setIpv4Color, setIsClicked);
                }} type="button" className="btn btn-secondary">Try another one</button>

                : null}
            </Col>
          </Row>
        </div>

      </Container>

    </div>
  );
}


export default App;
