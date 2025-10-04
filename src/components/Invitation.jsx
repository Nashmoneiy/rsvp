import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../assets/images/5a9c70da1591e3354c8ff22291459a40.jpg";
//import backgroundImage from "../assets/images/935e4886bfa6e3ff8910593af4018113.jpg";
import cardImage from "../assets/images/Wedding Invitation.png";
import musicFile from "../assets/music/Mercy-Chinwo-Wonder.mp3"; // 🎵 A
import axios from "axios";
import Swal from "sweetalert2";

export default function Invitation() {
  const [open, setOpen] = useState(false);
  const [spun, setSpun] = useState(false);
  const [showRSVP, setShowRSVP] = useState(false);
  const [loading, setLoading] = useState(true);
  const [playMusic, setPlayMusic] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [attending, setAttending] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://invitation-production-a234.up.railway.app/api/rsvp",
        {
          name,
          phone,
          code,
          attending,
        }
      );

      Swal.fire({
        icon: "success",
        title: "RSVP Submitted!",
        text: response.data.message,
        confirmButtonColor: "#3085d6",
      });

      setShowRSVP(false); // close modal after success
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
        confirmButtonColor: "#d33",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setOpen(true); // start animation automatically
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // inside Invitation component
  useEffect(() => {
    if (open && !spun) {
      // fallback in case onAnimationComplete doesn’t fire
      const timer = setTimeout(() => {
        setSpun(true);
      }, 1600); // a little longer than your spin duration (1.5s)
      return () => clearTimeout(timer);
    }
  }, [open, spun]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-white">
        <div
          className="spinner-border text-warning"
          role="status"
          style={{ width: "3rem", height: "3rem", animationDuration: "2s" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        paddingBottom: "60px", // for mobile RSVP button space
      }}
    >
      {/* Background music */}
      {playMusic}
      <div
        className="position-relative"
        style={{
          width: "500px",
          height: "536px",
          top: "-30px",
          maxWidth: "90%",
        }}
      >
        <audio src={musicFile} autoPlay loop controls />
        {/* <audio src={musicFile} autoPlay loop controls /> */}

        {/* Envelope with spin */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, ease: "linear" }}
          className="position-absolute w-100 h-100"
        >
          <div
            className="position-absolute bg-white rounded shadow border border-warning w-100 h-100"
            style={{
              clipPath: "polygon(50% 0%, 0% 25%, 0% 100%, 100% 100%, 100% 25%)",
            }}
          ></div>

          <div
            className="position-absolute top-0 start-0 border-start border-end border-bottom border-warning"
            style={{
              width: "0",
              height: "0",
              borderLeftWidth: "250px",
              borderRightWidth: "250px",
              borderBottomWidth: "200px",
              borderStyle: "solid",
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "#8F1736",
            }}
          ></div>

          <div
            className="position-absolute bottom-0 start-0"
            style={{
              height: "220px",
              width: "100%",
              backgroundColor: "#efe7dbff",
            }}
          ></div>

          <div
            className="position-absolute bottom-0 start-0  w-100"
            style={{ height: "200px" }}
          ></div>
        </motion.div>

        {/* Invitation card */}
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={spun ? { y: -40, opacity: 1 } : {}}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: 1.5,
          }}
          className="position-absolute start-50 translate-middle-x"
          style={{ width: "400px", maxWidth: "90%" }}
        >
          <img
            src={cardImage}
            alt="Invitation Card"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </motion.div>
      </div>

      {/* RSVP Button */}
      {/* Mobile RSVP Button */}

      {/* Mobile RSVP Button */}
      {/* Desktop RSVP Button */}
      <button
        className="btn position-fixed d-none d-md-block"
        style={{
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          backgroundColor: "#dbcfbcff",
          width: "290px",
          height: "10vh",
          zIndex: 1000,
        }}
        onClick={() => setShowRSVP(true)}
      >
        RSVP
      </button>

      {/* Mobile RSVP Button */}
      <button
        className="btn d-block d-md-none position-fixed start-50 translate-middle-x"
        style={{
          backgroundColor: "#dbcfbcff",
          width: "90%",
          height: "60px",
          bottom: "30px", // space from bottom
          zIndex: 1000,
          borderRadius: "8px",
        }}
        onClick={() => setShowRSVP(true)}
      >
        RSVP
      </button>

      {/* RSVP Modal */}
      {showRSVP && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
          style={{ zIndex: 1050 }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{ width: "90%", maxWidth: "400px" }}
          >
            <h3 className="text-warning mb-4">RSVP</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                required
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* <input
                type="text"
                placeholder="Phone number"
                required
                className="form-control mb-3"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              /> */}

              <input
                type="text"
                placeholder="OTP"
                required
                className="form-control mb-3"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <select
                required
                className="form-select mb-3"
                value={attending}
                onChange={(e) => setAttending(e.target.value)}
              >
                <option value="">Will you attend?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <button
                type="submit"
                className="btn w-100 mb-2"
                style={{ backgroundColor: "#C59068" }}
              >
                Submit
              </button>

              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => setShowRSVP(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
