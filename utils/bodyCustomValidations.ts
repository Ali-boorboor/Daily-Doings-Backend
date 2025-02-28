const descriptionValidation = (value: any, { isListTodo, listItems }: any) => {
  if (isListTodo !== 1 && value && !listItems && /\w{3,200}/.test(value)) {
    return true;
  } else if (isListTodo === 1 && listItems?.length >= 1 && !value) {
    return true;
  } else {
    return false;
  }
};

const descriptionEditValidation = (
  value: any,
  { isListTodo, listItems }: any
) => {
  if (isListTodo === 0 && value && !listItems && /\w{3,200}/.test(value)) {
    return true;
  } else if (isListTodo === 1 && listItems?.length >= 1 && !value) {
    return true;
  } else if (isListTodo !== 0 && isListTodo !== 1 && !value && !listItems) {
    return true;
  } else {
    return false;
  }
};

export { descriptionValidation, descriptionEditValidation };
