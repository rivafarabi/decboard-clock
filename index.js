const moment = require('./moment');

class DeckboardClock {
	constructor(props) {
		this.setValue = props.setValue;
		this.name = 'Clock';
		this.platforms = ['WINDOWS', 'LINUX'];

		this.inputs = [
			{
				label: 'Display Time',
				value: 'clock-display-time',
				icon: 'clock',
				mode: 'custom-value',
				fontIcon: 'fas',
				color: '#1a1a1a',
				input: [
					{
						label: 'Select Clock Format',
						type: 'input:select',
						items: [
							{ value: 'clock-12h', label: '12 Hour Format' },
							{ value: 'clock-24h', label: '24 Hour Format' }
						]
					}
				]
			}
		];
		this.configs = [];
		this.isFirstInit = true;
	}

	get selections() {
		return [{
			header: this.name
		}, ...this.inputs];
	}

	// Executes when the extensions loaded every time the app start.
	initExtension() {
		this.updateClock();
		setInterval(() => {
			if (this.isFirstInit) this.isFirstInit = false;
			this.updateClock()
		}, this.isFirstInit ? 60000 - (moment().get('seconds') * 1000) : 60000);
	}

	updateClock() {
		this.setValue({
			'clock-12h': moment().format('h:mm A'),
			'clock-24h': moment().format('HH:mm')
		})
	}

	execute() {
		return;
	};
}

module.exports = (sendData) => new DeckboardClock(sendData);
