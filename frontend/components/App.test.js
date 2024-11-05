import React from 'react';
import { render, screen, fireEvent, } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import '@testing-library/jest-dom';

describe('AppFunctional Component', () => {
  
  test("shows 'You can't go up' when trying to move up from the top row", async () => {
    render(<AppFunctional />);
  
    const upButton = screen.getByText(/up/i);
  
    fireEvent.click(upButton); 
    fireEvent.click(upButton);

    fireEvent.click(upButton);
    expect(await screen.findByText("You can't go up")).toBeInTheDocument();
  });
  
  
  
  test("shows 'Ouch: email is required' when submitting without an email", () => {
    render(<AppFunctional />);
    const submitButton = screen.getByText(/submit/i);
    
    
    fireEvent.click(submitButton);
    
    expect(screen.getByText("Ouch: email is required")).toBeInTheDocument();
  });
  
  test("shows 'Ouch: email must be a valid email' when submitting an invalid email", () => {
    render(<AppFunctional />);
    const emailInput = screen.getByPlaceholderText(/type email/i);
    const submitButton = screen.getByText(/submit/i);
    
    
    fireEvent.change(emailInput, { target: { value: 'invalid@email' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText("Ouch: email must be a valid email")).toBeInTheDocument();
  });
  
  test("shows 'foo@bar.baz failure #...' or '{username} win #' based on email", () => {
    render(<AppFunctional />);
    const emailInput = screen.getByPlaceholderText(/type email/i);
    const submitButton = screen.getByText(/submit/i);
    
    
    fireEvent.change(emailInput, { target: { value: 'foo@bar.baz' } });
    fireEvent.click(submitButton);
    expect(screen.getByText(/foo@bar.baz failure #/)).toBeInTheDocument();

    
    const resetButton = screen.getByText(/reset/i);
    fireEvent.click(resetButton);

    
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.click(submitButton);
    expect(screen.getByText(/user win #/)).toBeInTheDocument();
  });
});
