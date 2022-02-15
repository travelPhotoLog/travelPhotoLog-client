import React, { useState, useMemo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";

import { postingPhotoActions } from "../../features/postingPhotoSlice";
import theme from "../../styles/theme";
import { StyledButton } from "../common/CommonStyle";

const regionList = [
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

const PostingEditor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quillRef = useRef();
  const { user } = useSelector(state => state.user);
  const { photoUrl } = useSelector(state => state.postingPhoto);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [regions, setRegions] = useState([]);
  const [logOption, setLogOption] = useState(false);
  const imageUrl = photoUrl[Math.floor(Math.random() * photoUrl.length)];

  const [warnMsgs, setWarnMsgs] = useState({
    title: "",
    content: "",
    hashtag: "",
    regions: "",
    logOption: "",
    result: "",
  });

  const imageHandler = () => {
    navigate(user.id);
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ align: [] }, { color: [] }, { background: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  useEffect(() => {
    if (photoUrl[photoUrl.length - 1]) {
      setContent(
        content.concat("<img src=", photoUrl[photoUrl.length - 1], " /><br />")
      );
    }
  }, [photoUrl.length]);

  const handleChangeRegions = (checked, value) => {
    if (checked) {
      setRegions([...regions, value]);
    } else {
      setRegions(regions.filter(el => el !== value));
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const splitedHashtags = hashtags.split(",").map(hash => hash.trim());

    if (
      !title.length ||
      !content.length ||
      splitedHashtags.length > 5 ||
      !splitedHashtags[0] ||
      regions.length > 3 ||
      !regions.length ||
      !logOption.length
    ) {
      setWarnMsgs({
        ...warnMsgs,
        title: "제목을 입력해주세요.",
        content: "내용을 입력해주세요.",
        hashtag: "최소 1개부터 최대 5개까지 작성하셔야 합니다.",
        regions: "최소 1개부터 최대 3개까지 선택해야 합니다.",
        logOption: "로그옵션을 선택해주세요.",
      });

      return;
    }

    axios.post("/posting/new", {
      posting: {
        title,
        createdBy: user.nickname,
        content,
        hashtags: splitedHashtags,
        regions,
        logOption,
        imageUrl,
      },
      user: user.id,
    });

    setWarnMsgs({ ...warnMsgs, result: "posting이 생성되었습니다" });
    dispatch(postingPhotoActions.resetPhotoUrl());
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title style={{ maxWidth: "700px", margin: "2rem auto" }}>
          <div style={{ textAlign: "center" }}>
            <span>NEW POSTING BOARD</span>
          </div>
        </Title>

        <form onSubmit={handleSubmit}>
          <Editor>
            Title :
            <input name="title" onChange={e => setTitle(e.target.value)} />
            <WarningMessage>{warnMsgs.title || ""}</WarningMessage>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              placeholder="Type here"
              value={content}
              onChange={e => setContent(e)}
              modules={modules}
            />
            <WarningMessage>{warnMsgs.content || ""}</WarningMessage>
            Hashtags :
            <div>
              <input
                name="hashtags"
                onChange={e => setHashtags(e.target.value)}
              />
            </div>
            <WarningMessage>{warnMsgs.hashtag || ""}</WarningMessage>
            <p>Region</p>
            <div>
              {regionList?.map(item => (
                <div key={item.key}>
                  <input
                    type="checkbox"
                    name="region"
                    value={item}
                    onChange={e => {
                      handleChangeRegions(e.currentTarget.checked, item);
                    }}
                    checked={!!regions.includes(item)}
                  />
                  {item}
                </div>
              ))}
            </div>
            <WarningMessage>{warnMsgs.regions || ""}</WarningMessage>
            <h3>[Log option] 날짜별 방문기록 장소를 보여주시겠습니까 ? </h3>
            <select
              name="logOption"
              onChange={e => setLogOption(e.target.value)}
            >
              <option value="옵션선택">옵션선택</option>
              <option value="true">예</option>
              <option value="false">아니요</option>
            </select>
            <WarningMessage>{warnMsgs.logOption || ""}</WarningMessage>
            <div style={{ textAlign: "center", margin: "2rem" }}>
              <WarningMessage>{warnMsgs.result}</WarningMessage>
              <Button type="submit" onClick={() => navigate("/board")}>
                BACK
              </Button>
              <Button type="submit">SAVE</Button>
            </div>
          </Editor>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default PostingEditor;

const Container = styled.div`
  maxwidth: 700px;
  margin: auto 50px;
`;

const Title = styled.div``;

const Button = styled(StyledButton)`
  padding: 10px;
`;

const Editor = styled.div`
  width: 80%;
  margin: 10px;
`;

const WarningMessage = styled.div`
  width: 100%;
  height: 10%;
  margin-bottom: ${({ theme }) => theme.spacing.base};
  color: red;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 700;
  text-align: center;
`;
