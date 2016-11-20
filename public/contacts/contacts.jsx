console.log("hello");

var container = document.querySelector("#container");

//contact component
var Contacts = React.createClass({
	getInitialState: function() {
		return{
			name: 'Anna',
			email: 'gjc2118@gmail.com',
			phone: '781-354-5494'
		};
	},

	changeContact: function(){
		this.setState({name: 'Chris'});
	},

	render: function(){
		return(
		<div class="contacts">
			<h1 onClick={this.changeContact}>Contacts</h1>

			<div className="wrapper">			
			<ContactList 
				changeHandler={this.changeContact}
			/>
			<ContactDetails 
				name={this.state.name}
				phone={this.state.phone}
				email={this.state.email}
			/>
			</div>
		</div>
		)
	}
});

//contact details
var ContactList = React.createClass({
	render: function(){
		return(
			<ul className="list" onClick={this.props.changeHandler}>
				<li>Jack</li>
				<li>Jill</li>
				<li>Joan</li>
			</ul>
		)
	}
});

//contact details
//pass state to props
var ContactDetails = React.createClass({
	render: function(){
		return(
			<div className = "details">
				<h2> {this.props.name} </h2>
				<p> {this.props.phone} </p>
				<p> {this.props.email} </p>
			</div>
		)
	}
});

ReactDOM.render(<Contacts />, container);