"use client";

import "./styles/mdb.min.css";
import "./styles/snippet.css";
import "./styles/wheel.css";

/*
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCarousel,
  MDBCarouselItem,
  MDBCheckbox,
  MDBCol,
  MDBCollapse,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBRipple,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
*/
import { MDBBtn, MDBContainer, MDBFooter, MDBIcon } from "mdb-react-ui-kit";
import Select from "react-select";
//import dynamic from "next/dynamic";
/*
const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);
*/

import Globe from "./globe";
import SpinWheel from "./SpinWheel";

/*
interface ArrayObjectSelectState {
  selectedInstrument: Instrument | null;
}
*/

interface Instrument {
  value: string;
  label: string;
}

const options: Instrument[] = [
  { value: "blues", label: "Blues" },
  { value: "rock", label: "Rock" },
  { value: "jazz", label: "Jazz" },
  { value: "orchestra", label: "Orchestra" },
];
/*
const data = [
  { option: "0", style: { backgroundColor: "green" } },
  { option: "1", style: { backgroundColor: "white" } },
  { option: "2" },
];
*/
const segments = [
  { segmentText: ' ', segColor: 'red' },
  { segmentText: ' ', segColor: '#FBC31C' },
  { segmentText: ' ', segColor: 'lime' },
  { segmentText: ' ', segColor: 'green' },
  { segmentText: ' ', segColor: '#14BED4' },
  { segmentText: ' ', segColor: 'blue' },
  { segmentText: ' ', segColor: '#7249BA' },
  { segmentText: ' ', segColor: 'green' },
  // Add more segments as needed
];

export default function Home() {
  /*
  const [selectedOption, setSelectedOption] = useState<ArrayObjectSelectState>({
    selectedInstrument: null,
  });
  const [mustSpin, setMustSpin] = useState(false);
*/

  /*
  useEffect(() => {
    setMustSpin(true);
  }, []);
*/

/*
  const handleSpinClick = () => {
    if (!mustSpin) {
      setMustSpin(true);
    }
  };
*/

  return (
    <>
      <header>
        {/* Sidenav */}

        <nav
          id="sidenav-4"
          className="sidenav bg-glass opacity-100"
          data-mdb-color="light"
          data-mdb-mode="side"
          data-mdb-slim="true"
          data-mdb-slim-collapsed="true"
          data-mdb-content="#slim-content"
          style={{
            top: "115px",
            width: "70px",
            height: "100vh",
            position: "fixed",
            transition: "0.3s linear",
            transform: "translateX(0%)",
          }}
        >
          <div className="sidenav-item mb-2">
            <a
              id="slim-toggler"
              className="sidenav-link d-flex justify-content-center border-bottom ripple-surface ripple-surface-light"
            >
              <i className="fas fa-chevron-circle-right"></i>
            </a>
          </div>

          <ul className="sidenav-menu">
            <li className="sidenav-item">
              <a className="sidenav-link">
                <i className="fas fa-chart-area fa-fw me-3"></i>
                <span data-mdb-slim="false">Website traffic</span>
              </a>
            </li>
            <li className="sidenav-item">
              <a className="sidenav-link">
                <i className="fas fa-chart-line fa-fw me-3"></i>
                <span data-mdb-slim="false">Analytics</span>
              </a>
            </li>
            <li className="sidenav-item">
              <a className="sidenav-link">
                <i className="fas fa-chart-pie fa-fw me-3"></i>
                <span data-mdb-slim="false">SEO</span>
              </a>
            </li>
            <li className="sidenav-item">
              <a className="sidenav-link">
                <i className="fas fa-money-bill fa-fw me-3"></i>
                <span data-mdb-slim="false">Sales</span>
              </a>
            </li>
            <li className="sidenav-item">
              <a className="sidenav-link">
                <i className="fas fa-users fa-fw me-3"></i>
                <span data-mdb-slim="false">Users</span>
              </a>
            </li>
          </ul>
        </nav>

        <MDBContainer
          style={{ zIndex: "-1", position: "fixed" }}
          fluid
          className="fixed-top mt-4 mb-1"
        >
          <h1 className="display-5 fw-bold text-center">
            Explore The World&apos;s Visual Art
          </h1>
        </MDBContainer>
      </header>
      <main style={{ position: "relative", top: "90px" }}>
        <MDBContainer className="container py-4">
          <div className="row g-0 mb-5">
            <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
              {/* Card */}
              <div
                style={{
                  borderColor: "#26395A",
                  borderStyle: "none solid none none",
                  borderWidth: "25px",
                }}
                className="bg-glass shadow-4-strong h-100"
              >
                {/* Card header */}

                <div className="p-4">
                  <div className="row align-items-center">
                    <div className="mb-4 mb-md-0">
                      <h3 className="text-center mb-2">Time and Place</h3>
                    </div>
                  </div>
                </div>

                {/* Card header */}

                {/* Card body */}
                <Globe />
                {/* Card body */}
              </div>
              {/* Card */}
            </div>

            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="row g-0 mb-5">
                {/* Card */}
                <div
                  style={{
                    borderColor: "#26395A",
                    borderStyle: "none none none solid",
                    borderWidth: "25px",
                  }}
                  className="bg-glass shadow-4-strong"
                >
                  {/* Card header */}
                  <div className="p-4 pb-0">
                    <div className="row align-items-center">
                      <div className="mb-4 mb-md-0">
                        <h3 className="text-center mb-2">Pick an Artist</h3>
                      </div>
                    </div>
                  </div>
                  {/* Card header */}

                  {/* Card body */}
                  <div style={{ height: "150px" }} className="p-4 pb-0">
                    <Select
                      placeholder={"Search..."}
                      isMulti
                      unstyled
                      options={options}
                      isSearchable={true}
                    />
                  </div>
                  {/* Card body */}
                </div>
                {/* Card */}
              </div>
              <div className="row g-0 mb-5">
                {/* Card */}
                <div
                  style={{
                    borderColor: "#26395A",
                    borderStyle: "none none none solid",
                    borderWidth: "25px",
                  }}
                  className="bg-glass shadow-4-strong"
                >
                  {/* Card header */}

                  <div className="p-4 pb-0">
                    <div className="row align-items-center">
                      <div className="mb-4 mb-md-0">
                        <h3 className="text-center mb-2">Choose a Style</h3>
                      </div>
                    </div>
                  </div>

                  {/* Card header */}

                  {/* Card body */}
                  <div style={{ height: "150px" }} className="p-4 pb-0">
                    <Select
                      placeholder={"Search..."}
                      isMulti
                      unstyled
                      options={options}
                      isSearchable={true}
                    />
                  </div>
                  {/* Card body */}
                </div>
                {/* Card */}
              </div>
              <div className="row g-0 mb-5">
                {/* Card */}
                <div
                  style={{
                    borderColor: "#26395A",
                    borderStyle: "none none none solid",
                    borderWidth: "25px",
                  }}
                  className="bg-glass shadow-4-strong"
                >
                  {/* Card header */}
                  <div className="p-4">
                    <div className="row align-items-center">
                      <div className="mb-4 mb-md-0">
                      <h3 className="text-center mb-1">Spin the Wheel</h3>
                      <h6 className="text-center mb-2">for a random discovery!</h6>
                      </div>
                    </div>
                  </div>
                  {/* Card header */}

                  {/* Card body */}
                  <div style={{marginLeft:"40%", marginTop:"-10px", marginBottom: "40px"}}>
                  <SpinWheel segments={segments} onFinished={() => {return }}/>
                  </div>
                  {/*
                  <div className="parent-container">
                    <Wheel
                      mustStartSpinning={mustSpin}
                      prizeNumber={3}
                      data={data}
                    />
                    <button onClick={handleSpinClick}>SPIN</button>
                  </div>
                  */}
                  {/* Card body */}
                </div>
                {/* Card */}
              </div>
            </div>
          </div>
        </MDBContainer>
      </main>
      <MDBFooter
        style={{ position: "relative", marginTop: "25px" }}
        className="text-center"
      >
        <MDBContainer className="py-4">
          <MDBBtn
            href="#!"
            style={{ backgroundColor: "#3b5998" }}
            floating
            className="m-2"
          >
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>
          <MDBBtn
            href="#!"
            style={{ backgroundColor: "#55acee" }}
            floating
            className="m-2"
          >
            <MDBIcon fab icon="twitter" />
          </MDBBtn>
          <MDBBtn
            href="#!"
            style={{ backgroundColor: "#dd4b39" }}
            floating
            className="m-2"
          >
            <MDBIcon fab icon="google" />
          </MDBBtn>
          <MDBBtn
            href="#!"
            style={{ backgroundColor: "#ac2bac" }}
            floating
            className="m-2"
          >
            <MDBIcon fab icon="instagram" />
          </MDBBtn>
          <MDBBtn
            href="#!"
            style={{ backgroundColor: "#0082ca" }}
            floating
            className="m-2"
          >
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>
          <MDBBtn
            href="#!"
            style={{ backgroundColor: "#222222" }}
            floating
            className="m-2"
          >
            <MDBIcon fab icon="github" />
          </MDBBtn>
        </MDBContainer>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "black" }}
        >
          © 2024 Wayne Mareci
        </div>

      </MDBFooter>
    </>
  );
}
