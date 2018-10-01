import React, { Component } from 'react';
import './FlightCard.css';
import axios from 'axios';
import Parser from 'html-react-parser';
import { Helmet } from 'react-helmet';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './FlightCard.css';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { CardContent } from '@material-ui/core';

// let URL = this.props.flight.aircraft
const dev = true;
let URL;
dev
  ? (URL = 'http://127.0.0.1:8000/api/')
  : (URL = 'https://flightloggercs10.herokuapp.com/api');

const headers = {
  Authorization: 'JWT ' + localStorage.getItem('token')
};

class FlightCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aircraft_whatever: [],
      flight: [],
      openModal: false,

      nestedModal: false,
      closeAll: false,

      name: '',
      remarks: '',
      no_instument_app: null,
      no_ldg: null,
      cross_country: null,
      pic: null,
      dual_rec: null,
      actual_instr: null,
      sim_instr: null,
      day: null,
      night: null,
      airports_visited: '',
      fly_date: null,
      snippet: '',
      aircraft: null,
      id: null,
      license_type: '',
      total_hours: null,
      sv_html: '',
      sv_script: '',
      xxxsv_html2: '',
      xxxsv_script2: '',

      aircraftChoice: [],
      dropdownOpen: false,
      dropdownButtonTitle: ''
    };
  }
  modalToggle = () => {
    let randomNumber = Math.floor(Math.random() * 1000) + 10;
    let xxxsv_html2 = this.state.sv_html
      .split('sv_')
      .join('sv_' + randomNumber);
    let xxxsv_script2 = this.state.sv_script
      .split('sv_')
      .join('sv_' + randomNumber);
    // console.log("html2 =======: ", xxxsv_html2);
    // console.log("script2 =======: ", xxxsv_script2);

    this.setState({
      openModal: !this.state.openModal,
      xxxsv_html2: xxxsv_html2,
      xxxsv_script2: xxxsv_script2
    });
  };

  nestedModalToggle = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  };

  //TOGGLES DROPDOWN BUTTON FOR SELECTING AIRCRAFT WHEN ADDING NEW FLIGHT
  toggleDropdownButton = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  //CHANGES TITLE OF DROPDOWN BUTTON WHEN USER SELECTS THE AIRCRAFT USED WHEN CREATING NEW FLIGHT
  handleDropDownButton = (e) => {
    this.setState({ dropdownButtonTitle: e.target.name });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const headers = {
      Authorization: 'JWT ' + localStorage.getItem('token')
    };
    axios({
      method: 'get',
      url: `${this.props.flight.aircraft}`,
      headers: headers
    })
      .then((response) => {
        // console.log('flights ac response', response);
        this.setState({
          aircraft_whatever: response.data,
          dropdownButtonTitle: response.data.tail_number
        });
      })
      .catch((error) => {
        console.log('flights ac error', error);
      });
    this.setState({
      aircraftChoice: this.props.aircraftChoice,
      name: this.props.flight.name,
      remarks: this.props.flight.remarks,
      no_instument_app: this.props.flight.no_instument_app,
      no_ldg: this.props.flight.no_ldg,
      cross_country: this.props.flight.cross_country,
      pic: this.props.flight.pic,
      dual_rec: this.props.flight.dual_rec,
      actual_instr: this.props.flight.actual_instr,
      sim_instr: this.props.flight.sim_instr,
      day: this.props.flight.day,
      night: this.props.flight.night,
      airports_visited: this.props.flight.airports_visited,
      fly_date: this.props.flight.fly_date,
      snippet: this.props.flight.snippet,
      aircraft: this.props.flight.aircraft,
      id: this.props.flight.id,
      license_type: this.props.flight.license_type,
      total_hours: this.props.flight.total_hours,
      sv_html: this.props.flight.sv_html,
      sv_script: this.props.flight.sv_script,
      xxxsv_html2: this.props.flight.sv_html,
      xxxsv_script2: this.props.flight.sv_script
    });
  }

  // handleToggle = () => {
  //   let randomNumber = Math.floor(Math.random() * 1000) + 10;
  //   let xxxsv_html2 = this.state.sv_html.split('sv_').join('sv_' + randomNumber);
  //   let xxxsv_script2 = this.state.sv_html.split('sv_').join('sv_' + randomNumber);

  //   this.setState({
  //     openModal: !this.state.openModal,
  //     xxxsv_html2: xxxsv_html2,
  //     xxxsv_script2: xxxsv_script2
  //   });
  // };

  handleSnippet = (e) => {
    let html = e.target.value;
    html = html.split('200px; height: 200px;').join('300px; height: 300px;');
    let arr = html.split('</div>');
    let sv_html = arr[0] + '</div>';
    let sv_script = arr[1];

    // console.log('SV HTML ', sv_html);
    this.setState({ sv_html: sv_html, sv_script: sv_script });
  };


  toggleDelete = () => {
    axios({
      method: "DELETE",
      url: `${URL}flights/${this.state.id}/`,
      headers: headers
  }).then(response => {
    console.log(response)
    window.location.reload()
  }).catch( err => {
    console.log(err)
  })
  // this.setState({modal: !this.state.modal})
}

  // ADD NEW FLIGHT
  toggleAndPost = (e) => {
    // console.log('dropdowntitlestate', this.dropdownButtonTitle);
    let aircraftURL = `${URL}aircraft/`;
    let licensetype;
    for (let i = 0; i < this.state.aircraftChoice.length; i++) {
      if (
        this.state.aircraftChoice[i].tail_number ===
        this.state.dropdownButtonTitle
      ) {
        aircraftURL += this.state.aircraftChoice[i].id + '/';
        licensetype = this.state.aircraftChoice[i].license_type;
        console.log('flightlic', this.state.aircraftChoice[i].license_type);
      }
      this.setState({ license_type: licensetype });
      //   console.log('flightlicstate', this.state.license_type);
    }
    axios({
      method: 'PUT',
      url: `${URL}flights/${this.state.id}/`,
      data: {
        name: this.state.name,
        remarks: this.state.remarks,
        no_instument_app: this.state.no_instument_app,
        no_ldg: this.state.no_ldg,
        cross_country: this.state.cross_country,
        pic: this.state.pic,
        dual_rec: this.state.dual_rec,
        actual_instr: this.state.actual_instr,
        sim_instr: this.state.sim_instr,
        day: this.state.day,
        night: this.state.night,
        airports_visited: this.state.airports_visited,
        fly_date: this.state.fly_date,
        snippet: this.state.snippet,
        aircraft: aircraftURL,
        license_type: this.state.license_type,
        total_hours: this.state.total_hours,
        sv_html: this.state.sv_html,
        sv_script: this.state.sv_script
      },
      headers: headers
    })
      .then((response) => {
        // console.log('??????????', response);
      })
      .catch((error) => {
        console.log('put error', error);
      });
    this.setState({
      openModal: !this.state.openModal
    });
    window.location.reload();
  };

  render() {
    // console.log('====== aircraft BIG ============D:', this.props);
    // console.log('====== sv2: ', this.state.xxxsv_script2, this.state.xxxsv_html2)
    // console.log('======= Skinny Props: ', this.state.license_type);
    return (
      // flight card list
      <Card className="FlightCard" onClick={this.modalToggle}>
        <Typography>{this.props.flight.name}</Typography>
        <Typography>{this.props.flight.airports_visited}</Typography>
        <Typography>{this.state.aircraft_whatever.tail_number}</Typography>
        <CardContent>
        {Parser(this.props.flight.sv_html)}
        <Helmet>{Parser(this.props.flight.sv_script)}</Helmet>
        <div className="FLightCard-Hours-Date">
          <span>{this.props.flight.fly_date}</span>
          <span>{this.props.flight.total_hours}</span>
        </div>
        </CardContent>
        <Modal
          props={this.props.flight}
          isOpen={this.state.openModal}
          toggle={this.modalToggle}
        >
          {/* This is where the Flight Card Modal Starts */}
          <ModalHeader>
            <h4>
              {this.props.flight.name}
              {this.props.flight.fly_date}
            </h4>

            <button onClick={this.toggleDelete} className="edit-button">
              Delete
            </button>

            <h4>
              {this.props.flight.airports_visited}{' '}
              <button onClick={this.nestedModalToggle}>Edit</button>
            </h4>
          </ModalHeader>
          <ModalBody>
            {Parser(this.state.xxxsv_html2)}
            <Helmet>{Parser(this.state.xxxsv_script2)}</Helmet>
          </ModalBody>

          <ModalBody>
            <p>{this.state.aircraft_whatever.tail_number}</p>
            <p>{this.state.aircraft_whatever.man_type}</p>
          </ModalBody>
          <ModalBody>
            <textarea rows="4" cols="50" readOnly>
              {this.props.flight.remarks}
            </textarea>
          </ModalBody>
          <ModalFooter className="modal-footer">
            <ul className="ul-1">
              <li>{this.props.flight.license_type}</li>
              <li>Cross Country {this.props.flight.cross_country}</li>
              <li>No. Instr. App. {this.props.flight.no_instument_app}</li>
              <li>No. Ldg: {this.props.flight.no_ldg}</li>
            </ul>
            <ul className="ul-2">
              <li>Day: {this.props.flight.day}</li>
              <li>Night {this.props.flight.night}</li>
              <li>
                Actual Instr.
                {this.props.flight.actual_instr}
              </li>
              <li>
                Sim. Instr.
                {this.props.flight.sim_instr}
              </li>
            </ul>
            <ul className="ul-2">
              <li>Grnd Trainer</li>
              <li>PIC: {this.props.flight.pic}</li>
              <li>Dual Rec: {this.props.flight.dual_rec}</li>
              <li>Total {this.props.flight.total_hours}</li>
            </ul>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.nestedModal}
          toggle={this.nestedModalToggle}
          onClosed={this.state.closeAll ? this.toggle : undefined}
        >
          <ModalHeader>
            <input
              className="new-flight-input-name"
              name="name"
              onChange={this.handleInputChange}
              placeholder="Flight Name"
              value={this.state.name}
            />
            <input
              className="new-flight-input-av"
              name="airports_visited"
              onChange={this.handleInputChange}
              placeholder="Airports Visited"
              value={this.state.airports_visited}
            />
            <input
              className="new-flight-input-av"
              name="fly_date"
              onChange={this.handleInputChange}
              type="date"
              value={this.state.fly_date}
            />
          </ModalHeader>
          <ModalBody className="new-flight-snippet">
            <textarea
              rows="4"
              cols="50"
              name="html-snippet"
              form="usrform"
              onChange={this.handleSnippet}
              placeholder="Paste your HTML Snippet Here"
              value={this.state.sv_html + this.state.sv_script}
            />
          </ModalBody>
          {/* DROP DOWN FOR SELECTING AIRCRAFT */}
          <ButtonDropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropdownButton}
          >
            <DropdownToggle caret>
              {this.state.dropdownButtonTitle}
            </DropdownToggle>
            <DropdownMenu>
              {this.state.aircraftChoice.map((aircraft) => {
                return (
                  <DropdownItem
                    onClick={this.handleDropDownButton}
                    name={aircraft.tail_number}
                    key={aircraft.id}
                  >
                    {aircraft.tail_number}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </ButtonDropdown>
          {/* ====== END DROP DOWN FOR SELECTING AIRCRAFT =========*/}
          <ModalBody>
            <textarea
              placeholder="Remarks, Procedures, Maneuvers"
              name="remarks"
              onChange={this.handleInputChange}
              rows="4"
              cols="50"
              value={this.state.remarks}
            />
          </ModalBody>
          <ModalFooter>
            <div>
              <div>
                Cross Country
                <input
                  className="new-flight-pic-input"
                  name="cross_country"
                  onChange={this.handleInputChange}
                  value={this.state.cross_country}
                />
              </div>
              <div>
                No Instr app.
                <input
                  className="new-flight-pic-input"
                  name="no_instument_app"
                  onChange={this.handleInputChange}
                  value={this.state.no_instument_app}
                />
              </div>
              <div>
                No. Ldg.
                <input
                  className="new-flight-pic-input"
                  name="no_ldg"
                  onChange={this.handleInputChange}
                  value={this.state.no_ldg}
                />
              </div>
              <div>
                Day
                <input
                  className="new-flight-pic-input"
                  name="day"
                  onChange={this.handleInputChange}
                  value={this.state.day}
                />
              </div>
              <div>
                Night
                <input
                  className="new-flight-pic-input"
                  name="night"
                  onChange={this.handleInputChange}
                  value={this.state.night}
                />
              </div>
              <div>
                Actual Instr.
                <input
                  className="new-flight-pic-input"
                  name="actual_instr"
                  onChange={this.handleInputChange}
                  value={this.state.actual_instr}
                />
              </div>
              <div>
                Sim. Instr.
                <input
                  className="new-flight-pic-input"
                  name="sim_instr"
                  onChange={this.handleInputChange}
                  value={this.state.sim_instr}
                />
              </div>
              <div>
                PIC
                <input
                  className="new-flight-pic-input"
                  name="pic"
                  onChange={this.handleInputChange}
                  value={this.state.pic}
                />
              </div>
              <div>
                Dual Rec.
                <input
                  className="new-flight-pic-input"
                  name="dual_rec"
                  onChange={this.handleInputChange}
                  value={this.state.dual_rec}
                />
              </div>
              <div>
                Total
                <input
                  className="new-flight-pic-input"
                  name="total_hours"
                  onChange={this.handleInputChange}
                  value={this.state.total_hours}
                />
                <button className="edit-button" onClick={this.toggleAndPost}>
                  Save
                </button>
              </div>
            </div>
          </ModalFooter>
        </Modal>
        <br />
      </Card>
    );
  }
}

export default FlightCard;
