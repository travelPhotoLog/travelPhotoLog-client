import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import { searchingActions } from "../../features/searchingSlice";
import theme from "../../styles/theme";
import { greyButton } from "../common/CommonStyle";

const SearchForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchingWord, setSearchingWord] = useState({
    region: "",
    tag: "",
  });
  const user = useSelector(state => state.user.user);

  const regions = [
    "서울특별시",
    "경기도",
    "인천광역시",
    "강원도",
    "충청북도",
    "충청남도",
    "대전광역시",
    "세종특별자치시",
    "전라북도",
    "전라남도",
    "광주광역시",
    "경상북도",
    "경상남도",
    "부산광역시",
    "대구광역시",
    "울산광역시",
    "제주특별자치도",
    "울릉도",
    "독도",
  ];

  const handleWriteClick = () => {
    if (user.email) {
      navigate(`/board/${user.nickname}`);
      return;
    }

    navigate("/auth/login");
  };

  const handleMyPostingClick = () => {
    if (user.email) {
      navigate("/board/new-posting");
      return;
    }

    navigate("/auth/login");
  };

  const handleRegionClick = event => {
    setSearchingWord({
      ...searchingWord,
      region: event.currentTarget.value,
    });
  };

  const handleTagInput = event => {
    setSearchingWord({
      ...searchingWord,
      tag: event.target.value,
    });
  };

  const handleSearchClick = event => {
    event.preventDefault();

    dispatch(searchingActions.setKeyword(searchingWord));
  };

  return (
    <ThemeProvider theme={theme}>
      <Form onSubmit={handleSearchClick}>
        <RegionBox onChange={handleRegionClick}>
          <option value="">지역</option>
          {regions.map(region => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </RegionBox>
        <Input
          placeholder="🔎 검색을 원하는 태그를 입력해주세요-"
          onChange={handleTagInput}
        />
        <Search type="submit">Search 🕵️‍♀️</Search>
        <Post
          className={user.email ? "show" : "hide"}
          onClick={handleWriteClick}
        >
          Post 📝
        </Post>
        <MyPosting
          className={user.email ? "show" : "hide"}
          onClick={handleMyPostingClick}
        >
          My Posting 📗
        </MyPosting>
      </Form>
    </ThemeProvider>
  );
};

export default SearchForm;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
`;

const RegionBox = styled.select`
  width: 8%;
  height: 40%;
  margin: 0 ${({ theme }) => theme.spacing.base};
`;

const Input = styled.input`
  width: 30%;
  height: 40%;
  margin: 0 ${({ theme }) => theme.spacing.base};
`;

const Search = styled(greyButton)``;

const Post = styled(greyButton)`
  width: 5%;
  &.hide {
    display: none;
  }
`;

const MyPosting = styled(greyButton)`
  width: 8%;
  &.hide {
    display: none;
  }
`;
