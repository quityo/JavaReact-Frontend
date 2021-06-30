import React from 'react'

export default function SkillPopup() {
    return (
        <div>
        <Popup
          trigger={
            <Label
              icon="thumbtack"
              content="Skills"
              color="blue"
            />
          }
        >
          <Popup.Header>
            <Icon name="thumbtack" color="blue" />
            Skills
          </Popup.Header>
          <Popup.Content>
            <Segment.Inline>Java Developer</Segment.Inline>
            <Segment.Inline>Software Developer</Segment.Inline>
          </Popup.Content>
        </Popup>
      </div>
    );
}
