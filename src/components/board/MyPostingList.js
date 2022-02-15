import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";

import { ERROR_MESSAGE } from "../../constants";
import theme from "../../styles/theme";
import ResponseMessage from "../common/ResponseMessage";
import MyPosting from "./MyPosting";

const MyPostingList = () => {
  const { user } = useSelector(state => state.user);

  const [totalPage, setTotalPage] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getMyPostings = async pageNum => {
      try {
        const response = (
          await axios.get(`/user/${user.id}/postings?page=${pageNum}`)
        ).data;

        if (response.postings) {
          const { postings, totalPages } = response;

          setPosts(postings);

          if (totalPages !== totalPage) {
            setTotalPage(totalPages);
          }
          return;
        }

        if (response.error) {
          setHasError(true);
        }
      } catch (error) {
        setHasError(true);
      }
    };

    getMyPostings(pageNum);
  }, [pageNum]);

  const pages = new Array(totalPage).fill(null).map((value, index) => index);

  const handlePrevClick = () => {
    setPageNum(Math.max(1, pageNum - 1));
  };

  const handleNextClick = () => {
    setPageNum(Math.min(totalPage, pageNum + 1));
  };

  return hasError ? (
    <ResponseMessage message={ERROR_MESSAGE.SERVER_UNSTABLE} />
  ) : (
    <ThemeProvider theme={theme}>
      <Container>
        <h1>[ My postings ]</h1>
        <Content>
          {posts.map(post => (
            <MyPosting key={post._id} postingInfo={post} />
          ))}
        </Content>
      </Container>
      <Buttons>
        <PrevBtn onClick={handlePrevClick}>Prev</PrevBtn>
        {pages.map(page => (
          <Button key={page} onClick={() => setPageNum(page + 1)}>
            {page + 1}
          </Button>
        ))}
        <NextBtn onClick={handleNextClick}>Next</NextBtn>
      </Buttons>
    </ThemeProvider>
  );
};

export default MyPostingList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 83%;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80vw;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const PrevBtn = styled(IoIosArrowDropleft)`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  cursor: pointer;
`;

const NextBtn = styled(IoIosArrowDropright)`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  cursor: pointer;
`;

const Button = styled.button`
  margin: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
`;
