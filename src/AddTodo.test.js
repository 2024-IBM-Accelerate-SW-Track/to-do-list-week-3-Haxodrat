import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import '@testing-library/jest-dom'
import App from './App';
import AddTodo from './component/AddTodo';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that AddTodo component doesn\'t render duplicate Task', () => {
  render(<AddTodo />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "04/20/2024";
  fireEvent.change(inputTask, { target: { value: "Hey"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByTestId(/Hey/i);
  const checkDate = screen.getByText(new RegExp(dueDate, "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
  fireEvent.change(inputTask, { target: {value: "Hey"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  const noDupe = screen.queryAllByText(/Hey/i);
  expect(noDupe.length).toBe(1);

 });

 test('test that AddTodo component doesn\'t add a task without task name', () => {
  render(<AddTodo />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "04/20/2024";
  fireEvent.change(inputTask, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const checkDate = screen.queryByText(new RegExp(dueDate, "i"));
  expect(checkDate).not.toBeInTheDocument();
 });

 test('test that AddTodo component doesn\'t add a task without due date', () => {
  render(<AddTodo />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Hey"}});
  fireEvent.change(inputDate, { target: { value: null}});
  fireEvent.click(element);
  const check = screen.queryByTestId(/Hey/i);
  expect(check).not.toBeInTheDocument();
 });



 test('test that AddTodo component can be deleted thru checkbox', () => {
  render(<AddTodo />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "04/20/2024";
  const dueDate2 = "07/01/2028";
  fireEvent.change(inputTask, { target: { value: "Hey"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: {value: "Hi"}});
  fireEvent.change(inputDate, { target: { value: dueDate2}});
  fireEvent.click(element);
  const heyCheck = screen.getByTestId(/Hey/i).style.background;
  const hiCheck = screen.getByTestId(/Hi/i).style.background;
  expect(heyCheck).not.toBe(hiCheck);
 });


 test('test that AddTodo component renders different colors for past due events', () => {
  render(<AddTodo />);
  const check = screen.getByRole('checkbox', {});
 });
