import React, { Component } from "react";
import get from "lodash/get";
import Material from "../../../material/components/CaseMaterial";
import { pad } from "../../../../../common/utils/pad";

class Rewards extends Component {
  render() {
    const { current_hackathon } = this.props;
    const reward_list = current_hackathon.rewards || [];
    const leader_board_link = get(current_hackathon, "_link.get_leader_board");
    const edit_leader_board_link = get(
      current_hackathon,
      "_link.edit_leader_board"
    );
    return (
      <div className="hd-child">
        <div className="rewards">
          {reward_list.map((r, i) => (
            <RewardCard key={i} {...r} />
          ))}
        </div>
        <div className="hd-child-material">
          <h2 className="hd-child-material__title">Leader Board</h2>
          <Material
            material_link={leader_board_link}
            update_link={edit_leader_board_link}
          />
        </div>
      </div>
    );
  }
}

export default Rewards;

const RewardCard = ({
  title,
  amount,
  sequence,
  image_url,
  currency_symbol_code
}) => {
  return (
    <div
      className="reward-card"
      style={{ backgroundImage: `url(${image_url})` }}
    >
      <div className="reward-card__title">{title}</div>
      <div className="reward-card__amount">
        <span dangerouslySetInnerHTML={{ __html: currency_symbol_code }} />
        {amount}
      </div>
      <span className="reward-card__rank">{pad(sequence, 2)}</span>
    </div>
  );
};
