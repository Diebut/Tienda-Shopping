import styled from "styled-components";

export const StyledForm = styled.form`
  max-width: 400px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  h2 {
    margin-bottom: 1rem;
    text-align: center;
    color: #333;
    font-size: 1.8rem;
    font-weight: bold;
  }

  button,
  input {
    height: 40px;
    width: 100%;
    padding: 8px;
    outline: none;
    border-radius: 8px;
    border: 1px solid rgb(220, 220, 220);
    margin-bottom: 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        border: 1px solid #00d0ff;
        box-shadow: 0 0 8px rgba(0, 208, 255, 0.3);
        }
    }

    button {
        background-color: #00d0ff;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        border: none;
        transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #00b8e6;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
        }
    }

    p {
        font-size: 14px;
        color: red;
        text-align: center;
    }

  /* Adding fade-in animation for the form */
    @keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
        }
    }

    animation: fadeIn 0.5s ease forwards;
`;


