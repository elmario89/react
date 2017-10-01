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
            visible: false
        };
    },
    readmoreClick: function(e) {
        e.preventDefault();

        var state = this.state.visible;

        if (state) {
            this.setState({visible: false});
        } else {
            this.setState({visible: true});
        }
    },
    render: function() {
        var data = this.props.data,
            visible = this.state.visible;

        return (
            <div className="article">
                <p className="news__author">{data.author}</p>
                <p className="news__text">{data.text}</p>
                <a href="#"
                   onClick={this.readmoreClick}
                   className={'news__readmore'}
                >
                    {visible ? 'Свернуть' : 'Подробнее'}
                </a>
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
                <strong className={'news__count ' + (data.length > 0 ? '' : 'none')}>Всего новостей: {data.length}</strong>
            </div>
        )
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div>
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