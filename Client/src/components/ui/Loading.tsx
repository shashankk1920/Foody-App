import { Loader as LoaderIcon } from "lucide-react";
import styled, { keyframes } from "styled-components";

const rotateSlow = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateReverse = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.6; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StyledWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #1e293b, #334155, #475569);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow: hidden;

  .circle {
    position: absolute;
    border-radius: 50%;
    border: 3px solid transparent;
  }

  .circle1 {
    width: 20rem;
    height: 20rem;
    border-color: #38bdf8 transparent transparent #38bdf8;
    opacity: 0.3;
    animation: ${rotateSlow} 12s linear infinite;
  }

  .circle2 {
    width: 14rem;
    height: 14rem;
    border-color: #22d3ee transparent #22d3ee transparent;
    opacity: 0.4;
    animation: ${rotateReverse} 10s linear infinite;
  }

  .circle3 {
    width: 8rem;
    height: 8rem;
    border-color: transparent #818cf8 #818cf8 transparent;
    opacity: 0.5;
    animation: ${pulse} 3s ease-in-out infinite;
  }

  .glass-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    backdrop-filter: blur(12px);
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(255, 255, 255, 0.1);
    animation: ${fadeIn} 1s ease-in-out forwards;
    z-index: 10;
  }

  .loader-text {
    margin-top: 1rem;
    color: #f8fafc;
    font-weight: 600;
    font-size: 1.25rem;
    text-shadow: 0px 2px 6px rgba(255, 255, 255, 0.2);
    user-select: none;
  }
`;

const Loader = () => {
  return (
    <StyledWrapper>
      {/* Animated Background Circles */}
      <div className="circle circle1" />
      <div className="circle circle2" />
      <div className="circle circle3" />

      {/* Loader Icon & Text inside a Glassmorphism Card */}
      <div className="glass-container">
        <LoaderIcon className="animate-spin w-20 h-20 text-blue-300 drop-shadow-xl" />
        <p className="loader-text">Loading, please wait...</p>
      </div>
    </StyledWrapper>
  );
};

export default Loader;