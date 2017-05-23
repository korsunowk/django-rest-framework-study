import React from 'react';
import styled from 'styled-components';


class CanvasWatch extends React.Component {
	render() {
		return <CanvasArea id="canvas" width={300} height={300} />
	}

	componentDidMount() {
		let cnv = document.getElementById('canvas');
		let ctx = cnv.getContext('2d');
		let centerX = cnv.width / 2;
		let centerY = cnv.height / 2;
		
		ctx.beginPath();
		ctx.arc(centerX, centerY, 150, 0, 2 * Math.PI); // circle
		ctx.stroke();

		ctx.font = "35px Times New Roman";
		ctx.fillText("12", centerX - 16, centerY - 120);
		ctx.fillText("6", centerX - 6, centerY + 145);
		ctx.fillText("9", centerX - 145, centerY);  // numbers on Watch
		ctx.fillText("3", centerX + 125, centerY);

	}
}


const CanvasArea = styled.canvas`
	position: absolute;
	top: 35px;
	left: 35px;
  `;

export default CanvasWatch;