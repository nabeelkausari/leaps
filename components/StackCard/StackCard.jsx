import React from "react";
import styled, { keyframes } from "styled-components";
import posed from "react-pose";
import { Link } from "react-router-dom";
import { DownArrow, UpArrow } from "../../../tenants/atoms/assets";
import "./StackCard.scss";

let Style;
(function(Style) {
  Style.bgColor = ({ background, bgStatus }) =>
    bgStatus === "colors" ? background : "";
  Style.clipPath = ({ pose, direction }) => {
    return (pose[0] === "out" && direction === "swipeFallTop") ||
      direction === "swipeFallDown"
      ? "polygon(0 0, 100% 0%, 98% 100%, 2% 100%)"
      : "";
  };
  Style.transform = ({ direction }) =>
    direction === "swipeFallTop" ? "top center" : "bottom center";
  Style.anim = ({ pose }) => (pose[0] === "out" ? fadeOut : "");
  Style.liHeight = ({ height }) => height + "rem";
  Style.liWidth = ({ width }) => width + "rem";
  Style.bgImage = ({ background }) => background;
})(Style || (Style = {}));

const cornersTransition = ({ duration }) => ({
  stiffness: 500,
  type: "spring",
  delay: 150,
  duration
});

const middleTransition = ({ direction }) => {
  return objectSwitch(direction, {
    default: ({ duration }) => ({ duration }),
    swipeCornerDownRight: cornersTransition,
    swipeCornerTopRight: cornersTransition,
    swipeCornerDownLeft: cornersTransition,
    swipeCornerTopLeft: cornersTransition
  });
};

function objectSwitch(value, target, exec = false) {
  return target[value]
    ? exec
      ? target[value]()
      : target[value]
    : target.default
    ? exec
      ? target.default()
      : target.default
    : null;
}

const Li = posed.div({
  init: {
    transition: ({ duration }) => ({ duration }),
    scale: ({ order }) => {
      return objectSwitch(order, {
        0: 1,
        1: 0.95,
        2: 0.9
      });
    },
    y: ({ order, height }) => {
      const parsedHeight = Number.parseInt(height) / 10;
      return objectSwitch(order, {
        0: parsedHeight * 2,
        1: parsedHeight,
        2: 0,
        3: 0,
        4: 0
      });
    },
    opacity: 1,
    rotate: 0,
    x: 0
  },
  out: {
    transition: ({ duration }) => ({ duration }),
    x: ({ direction }) => {
      return objectSwitch(direction, {
        swipeDown: 0,
        swipeTop: 0
      });
    },
    rotate: ({ direction }) => {
      return objectSwitch(direction, {
        swipeDown: 0,
        swipeTop: 0
      });
    },
    scale: ({ direction }) => {
      return objectSwitch(direction, {
        swipeThrowRight: 0.001,
        swipeThrowLeft: 0.001,
        swipeThrowDown: 0.001,
        swipeThrowTop: 0.001
      });
    },
    y: ({ direction }) => {
      return objectSwitch(direction, {
        swipeTop: "-20rem",
        swipeDown: "15"
      });
    },
    opacity: 0
  },
  middle: {
    transition: middleTransition,
    opacity: 1,
    scale: 1,
    y: ({ height }) => {
      const parsedHeight = Number.parseInt(height) / 10;
      return parsedHeight * 2 + "rem";
    },
    x: 0
  },
  secondMiddle: {
    transition: middleTransition,
    scale: 0.95,
    opacity: 0.4,
    y: ({ height }) => {
      const parsedHeight = Number.parseInt(height) / 10;
      return parsedHeight + "rem";
    },
    x: 0
  },
  in: {
    transition: cornersTransition,
    scale: 0.9,
    opacity: 0.2,
    y: 0,
    x: 0
  }
});

const StyledUl = styled.div`
  height: ${Style.liHeight};
  width: ${Style.liWidth};
  position: relative;
  z-index: -1;
`;
const fadeOut = keyframes`
  0% opacity: 1;
  25% opacity: 0.8;
  100% opacity: 0;
`;
const StyledLi = styled(Li)`
  background: ${Style.bgColor};
  background-image: url(${Style.bgImage});
  transform-origin: ${Style.transform};
  animation: 1s ${Style.anim} ease-out;
  clip-path: ${Style.clipPath};
  height: ${Style.liHeight};
  width: ${Style.liWidth};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  list-style: none;
  z-index: -1;
  left: 0;
  top: 0;
`;

export class StackCard extends React.Component {
  state = {
    stateOfContent: "",
    content: [],
    backContent: [],
    current: 0,
    list: [],
    direction: "swipeTop",
    lastItem: false,
    firstItem: true
  };

  firstMount = props => {
    if (this.state.list.length === 0 && props !== undefined) {
      const newList = this.state.list;
      for (let i = 0; i < 3; i++) {
        newList.push({
          val: props[i],
          out: "",
          in: i === 2 ? "in" : "",
          middle: i === 0 ? "middle" : i === 1 ? "secondMiddle" : ""
        });
      }
      const newContent = props.slice(3);
      this.setState({ list: newList, content: newContent });
    }
  };

  getIndex = (list, current) => {
    let firstItem = current === 0;
    let lastItem = !list[list.length - 2].val;
    return {
      firstItem,
      lastItem
    };
  };

  swipeNext = () => {
    const { current, list } = this.state;
    let newList = this.state.list;
    let currentContent = this.state.content;

    if (this.state.lastItem) return;

    if (!newList[newList.length - 2].val) {
      return this.setState({ lastItem: true }, () => {
        const { firstItem, lastItem } = this.state;
        return {
          firstItem,
          lastItem
        };
      });
    }

    newList.push({
      val: currentContent[0],
      out: "",
      in: "in",
      middle: ""
    });

    newList[current].out = "out";
    if (newList[current].out === "out") {
      newList[current].middle = "";
      newList[current + 1].middle = "middle";
      newList[current + 2].middle = "secondMiddle";
    }
    newList[list.length - 2].in = "";
    let newCurrent = (this.state.current += 1);
    let { firstItem, lastItem } = this.getIndex(newList, newCurrent);

    this.setState({
      direction: "swipeTop",
      list: newList,
      content: currentContent.slice(1),
      current: newCurrent,
      firstItem,
      lastItem
    });
    return {
      firstItem,
      lastItem
    };
  };

  swipePrev = () => {
    const { current, list } = this.state;
    let newList = [...this.state.list];
    let currentContent = [...this.state.content];

    if (this.state.firstItem) return;

    if (!newList[current - 1]) {
      return this.setState({ firstItem: true }, () => {
        const { firstItem, lastItem } = this.state;
        return {
          firstItem,
          lastItem
        };
      });
    }

    newList[current - 1].out = "";
    if (newList[current - 1].out === "") {
      newList[current - 1].in = "in";
      newList[current - 1].middle = "middle";
      newList[current].in = "";
      newList[current].middle = "secondMiddle";
      newList[current + 1].middle = "";
      newList[current + 1].in = "in";
    }
    newList[list.length - 4].in = "";
    newList.pop();
    currentContent.unshift(list[list.length - 1].val);
    let newCurrent = (this.state.current -= 1);
    let { firstItem, lastItem } = this.getIndex(newList, newCurrent);
    this.setState({
      direction: "swipeDown",
      list: newList,
      content: currentContent,
      current: newCurrent,
      firstItem,
      lastItem
    });
    return {
      firstItem,
      lastItem
    };
  };

  componentDidMount() {
    this.firstMount(this.props.images);
    this.setState({ stateOfContent: "images" });
  }
  render() {
    const { list, direction, firstItem, lastItem } = this.state;
    const props = this.props;
    const newList = !list.length
      ? ""
      : list
          .map((card, key) => (
            <StyledLi
              pose={[card.out, card.out2, card.middle, card.in]}
              bgStatus={this.state.stateOfContent}
              direction={direction}
              duration={props.duration}
              height={props.height}
              background={card.val}
              width={props.width}
              order={key}
              key={key}
            >
              {Array.isArray(props.children)
                ? props.children[key]
                : props.children}
            </StyledLi>
          ))
          .reverse();
    return (
      <div className="stack-cards">
        <StyledUl
          className={props.className}
          height={this.props.height}
          width={this.props.width}
        >
          {newList}
        </StyledUl>
        <div className="stack-cards__view-all">
          <Link to={props.viewAll}>View All</Link>
        </div>
        <div className="stack-cards__arrows">
          <div
            className={(lastItem || props.images.length === 1) && "disabled"}
            onClick={this.swipeNext}
          >
            <UpArrow className="stack-cards__arrows--icon" />
          </div>
          <div className={firstItem && "disabled"} onClick={this.swipePrev}>
            <DownArrow className="stack-cards__arrows--icon" />
          </div>
        </div>
      </div>
    );
  }
}
export default StackCard;
