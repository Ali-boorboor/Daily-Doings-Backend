type noContentHandlerType = {
  result: any;
  status?: number;
  message?: string;
};

const checkFalsyResult = ({
  result,
  status,
  message,
}: noContentHandlerType) => {
  if (!result || result?.length < 1) {
    throw {
      status: status ? status : 204,
      message,
    };
  }
};

export default checkFalsyResult;
