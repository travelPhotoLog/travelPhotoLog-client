import React, { useState, useMemo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";

import { postingPhotoActions } from "../../features/postingPhotoSlice";
import theme from "../../styles/theme";
import { StyledButton } from "../common/CommonStyle";
import ResponseMessage from "../common/ResponseMessage";

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
  const location = useLocation();
  const { id: postingId } = useParams();

  const quillRef = useRef();
  const { user } = useSelector(state => state.user);
  const { photoUrl } = useSelector(state => state.postingPhoto);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [regions, setRegions] = useState([]);
  const [logOption, setLogOption] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
    navigate(`/board/new-posting/${user.id}`);
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

  if (!isEditing && location.pathname.includes("write")) {
    setIsEditing(true);
  }

  useEffect(() => {
    if (location.state) {
      const { title, content, hashtags, regions, logOption } = location.state;

      setTitle(title);
      setContent(content);
      setHashtags(hashtags.toString());
      setRegions(regions);
      setLogOption(logOption);

      location.state = null;
    }
  }, []);

  useEffect(() => {
    const latestPhotoUrl = photoUrl[photoUrl.length - 1];

    if (latestPhotoUrl) {
      setContent(prev => {
        return prev.concat(`<img src="${latestPhotoUrl}" /><br />`);
      });
    }
  }, [photoUrl.length]);

  const handleChangeRegions = (checked, value) => {
    if (checked) {
      setRegions([...regions, value]);
    } else {
      setRegions(regions.filter(el => el !== value));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const latestPhotoUrl = photoUrl[photoUrl.length - 1];
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

    if (isEditing) {
      const { data } = await axios.put(`/posting/${postingId}`, {
        posting: {
          title,
          content,
          hashtags: splitedHashtags,
          regions,
          logOption,
          imageUrl: latestPhotoUrl,
        },
      });

      if (data.error) {
        return <ResponseMessage message={data.error.message} />;
      }

      if (data.result === "ok") {
        navigate(`/board/posting/${postingId}`);
        dispatch(postingPhotoActions.resetPhotoUrl());
      }

      return;
    }

    const { data } = await axios.post("/posting/new", {
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

    if (data.error) {
      return <ResponseMessage message={data.error.message} />;
    }

    if (data.result === "ok") {
      setWarnMsgs({ ...warnMsgs, result: "posting이 생성되었습니다" });
      dispatch(postingPhotoActions.resetPhotoUrl());
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title
          style={{ maxWidth: "700px", margin: "2rem auto", fontSize: "25px" }}
        >
          <div style={{ textAlign: "center" }}>
            <span>
              {isEditing ? "📃 EDIT YOUR POSTING" : "📃 NEW POSTING BOARD"}
            </span>
          </div>
        </Title>

        <Form onSubmit={handleSubmit}>
          <Editor>
            <TitleInput
              name="title"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <WarningMessage>{warnMsgs.title || ""}</WarningMessage>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              placeholder="Type your photolog"
              value={content}
              onChange={e => setContent(e)}
              modules={modules}
            />
            <WarningMessage>{warnMsgs.content || ""}</WarningMessage>
            <div>
              <HashTagInput
                name="hashtags"
                value={hashtags}
                placeholder="Hash tags"
                onChange={e => setHashtags(e.target.value)}
              />
            </div>
            <WarningMessage>{warnMsgs.hashtag || ""}</WarningMessage>
            <p>[Region]</p>
            <RegionCheck>
              {regionList.map(item => (
                <div key={item.key}>
                  <RegionItem
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
            </RegionCheck>
            <WarningMessage>{warnMsgs.regions || ""}</WarningMessage>
            <LogOptionTitle>
              [Log option] 날짜별 방문기록 장소를 보여주시겠습니까 ?
            </LogOptionTitle>
            <LogOptionItem
              name="logOption"
              value={logOption}
              onChange={e => setLogOption(e.target.value)}
            >
              <option value="옵션선택">옵션선택</option>
              <option value="true">예</option>
              <option value="false">아니요</option>
            </LogOptionItem>
            <WarningMessage>{warnMsgs.logOption || ""}</WarningMessage>
            <div style={{ textAlign: "center", margin: "2rem" }}>
              <WarningMessage>{warnMsgs.result || ""}</WarningMessage>
              <Button type="submit">{isEditing ? "UPDATE" : "SAVE"}</Button>
              <Button onClick={() => navigate("/board")}>BACK</Button>
            </div>
          </Editor>
        </Form>
      </Container>
    </ThemeProvider>
  );
};

export default PostingEditor;

const Container = styled.div`
  width: 80%;
  margin: 10px auto;
`;

const Form = styled.form`
  margin: 10px auto;
`;

const TitleInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid gray;
  font-size: 20px;
  &:hover : {
    background-color: #f8fff8;
  }
  &:focus {
    outline: none;
  }
`;

const HashTagInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px dotted gray;
  font-size: 15px;
  &:hover : {
    background-color: #f8fff8;
  }
  &:focus {
    outline: none;
  }
`;

const RegionCheck = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  text-overflow: ellipsis;
  white-space: normal;
`;

const RegionItem = styled.input`
  margin: 5px;
`;

const LogOptionTitle = styled.h3`
  display: inline-block;
`;

const LogOptionItem = styled.select`
  border: none;
  border-bottom: 1px solid gray;
`;

const Title = styled.div``;

const Button = styled(StyledButton)`
  display: inline;
  padding: 5px;
  border-radius: 5px;
  background-color: #dcedc8;
`;

const Editor = styled.div`
  width: 80%;
  margin: 10px auto;
`;

const WarningMessage = styled.div`
  width: 100%;
  height: 10%;
  margin-bottom: ${({ theme }) => theme.spacing.base};
  color: #a5b592;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 700;
  text-align: center;
`;
