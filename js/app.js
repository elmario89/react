var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

var dom = ReactDOM.findDOMNode;

var Add = React.createClass({
    onClickHandler: function() {
        alert('Автор: ' + dom(this.refs.author).value + ' \nТекст: ' + dom(this.refs.text).value);
    },
    onCheckAgreement: function(e) {
        if (!e.target.checked) {
            this.setState({agreementChecked: false});
        } else {
            this.setState({agreementChecked: true});
        }
    },
    onFieldChange: function(field, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({['' + field]: false})
        } else {
            this.setState({['' + field]: true})
        }
    },
    getInitialState: function() {
        return {
            agreementChecked: false,
            authorIsEmpty: true,
            textIsEmpty: true
        }
    },
    render: function() {
        var authorIsEmpty = this.state.authorIsEmpty;
        var textIsEmpty = this.state.textIsEmpty;
        var agreementChecked = this.state.agreementChecked;

        return (
            <form className="add cf">
                <input
                    className='test-input'
                    devaultValue=''
                    className='add__author'
                    ref='author'
                    placeholder='введите ваше имя'
                    onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                />
                <br/>

                <textarea
                    className='add__text'
                    defaultValue=''
                    ref='text'
                    placeholder='введите текст новости'
                    onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                ></textarea>
                <br/>

                <label className='add__checkrule'>
                    Я согласен с правилами
                    <input
                        onChange={this.onCheckAgreement}
                        type="checkbox"
                        defaultChecked={false}
                        ref="agreement"
                    />
                </label>

                <button
                    className='add__btn'
                    onClick={this.onClickHandler}
                    ref='alert_button'
                    disabled={!agreementChecked || authorIsEmpty || textIsEmpty}>
                    Show added news.
                </button>
            </form>
        )
    }
});

var Article = React.createClass({
    PropTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function() {
        return {
            visible: false,
            counter: 0
        };
    },
    readmoreClick: function(e) {
        e.preventDefault();

        var state = this.state.visible,
            counter = this.state.counter;

        if (state) {
            this.setState({visible: false});
        } else {
            this.setState({visible: true, counter: ++counter});
        }
    },
    render: function() {
        var data = this.props.data,
            visible = this.state.visible,
            counter = this.state.counter;

        return (
            <div className="article">
                <p className="news__author">{data.author}</p>
                <p className="news__text">{data.text}</p>
                <a href="#"
                   onClick={this.readmoreClick}
                   className={'news__readmore'}>
                   {visible ? 'Свернуть' : 'Подробнее'}
                </a>
                <div>Новость прочитана  {counter} раз</div>
                <p className={'news__big-tex ' + (visible ? '' : 'none')}>{data.bigText}</p>
            </div>
        )
    }
});

var News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    render: function() {
        var data = this.props.data;
        var newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong
                    className={'news__count ' + (data.length > 0 ? '' : 'none')}>
                    Всего новостей: {data.length}
                </strong>
            </div>
        )
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Add/>
                <h3>Новости</h3>
                <News data={my_news}/>
            </div>
        )
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);