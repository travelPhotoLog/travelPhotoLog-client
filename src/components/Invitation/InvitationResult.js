import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";

import ResponseMessage from "../common/ResponseMessage";
import { ERROR_MESSAGE } from "../../constants";

const getInvitationResult = (id, token) => {
  return axios.put(
    `${process.env.REACT_APP_SERVER_URI}/map/${id}/invitation/${token}`,
    { withCredentials: true }
  );
};

const InvitationResult = () => {
  const { id, token } = useParams();
  const { data, isLoading } = useQuery(
    "invitationResult",
    () => getInvitationResult(id, token),
    {
      select: response => response.data,
    }
  );

  if (isLoading) {
    return <div />;
  }

  if (data?.error) {
    if (data.error.code === 403) {
      return <ResponseMessage message={ERROR_MESSAGE.FORBIDDEN} />;
    }

    if (data.error.code === 404) {
      return <ResponseMessage message={ERROR_MESSAGE.BAD_REQUEST} />;
    }

    if (data.error.code === 500) {
      return <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />;
    }
  }

  if (data?.result) {
    return <ResponseMessage message="초대가 완료 되었습니다🍑" />;
  }

  return <div />;
};

export default InvitationResult;
