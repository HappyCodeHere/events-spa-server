import Event from '../model/event';

// import moment from 'moment';

// model Event
// date: 1502218800000
// title: "SOFT SKILLS GYM"
// originalLink: "event/soft-skills-gym-3/"
// source: "imaguru.by"
// _id: "598740d6ac53c8355c846c0c"

export const saveEventItemToDB = (results) => {
  results.forEach(item => {

    const saveEvent = () => {
      const event = new Event(item);
      event.save()
        .then(() => {
          console.log('saved new');
        })
        .catch(error => {
          console.log(error);
        })
    }

    const updateEvent = (_id, item) => {
      const { date, title, originalLink, source, text, images} = item;
      Event.findByIdAndUpdate(_id, { date, title, originalLink, source, text, images })
        .then(() => {
          console.log('update event');
        })
        .catch(error => {
          console.log('update error', error);
        })
    }

    // ищем по ссылке вида event/2017-08-01/tensorflow-meetup
    // console.log(item.originalLink);
    Event.find({ originalLink: item.originalLink })
      .then((data) => {
        // если что то нашлось
        if (data.length > 0) {
          // и другой title или date
          // source тут никак не учавствует вроде
          if (item.title !== data[0].title || item.date !== data[0].date || item.source !== data[0].source || item.text !== data[0].text || item.images !== data[0].images) {
            updateEvent(data[0]._id, item);
            return;
          }
          console.log('event actual', item.title, 'from', item.source);
        // если не нашлось в бд
        } else {
          saveEvent();
        }
      })
      .catch(error => {
        console.log(error);
      })
  })
}


export const convertMonths = (text) => {

  const monthRU = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июн', 'Июл', 'Август', 'Сентябр', 'Октябр', 'Ноябр', 'Декабр'];
  const monthEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


  monthRU.forEach((item, i) => {
    let startIndex = text.toLowerCase().indexOf(item.toLowerCase());

    while (startIndex >= 0) {
      let endIndex = text.indexOf(' ', startIndex);
      if (endIndex === -1) {
        endIndex = text.length;
      }
      const russianMonth = text.slice(startIndex, endIndex);

      text = text.replace(russianMonth, monthEN[i]);
      startIndex = text.toLowerCase().indexOf(item.toLowerCase());
    }
  });

  return text;
}


export const formatDate = (year, month, day, hour, minute) => {
  // const date = Date.parse(moment(new Date(year, month - 1, day, hour || 0, minute || 0 )));
  // console.log('hour', hour);
  // console.log(moment(new Date(year, month - 1, day, hour || 0, minute || 0 )));
  // console.log(new Date(year, month - 1, day, hour || 0, minute || 0 ).toUTCString());

  // console.log(moment(new Date(year, month - 1, day, hour || 0, minute || 0 )));
  // console.log(moment(new Date(year, month - 1, day, hour || '')));
  // const date = Date.parse(moment.tz(new Date(year, month - 1, day, hour || '', minute || ''), 'Europe/Minsk'));
  // const date = Date.UTC(year, month - 1, day, hour || 0, minute || 0);

  // console.log(Date.parse((new Date(year, month - 1, day, (hour || 0) - (new Date().getTimezoneOffset() === 0 ? 3: 0) , minute || 0 )).toUTCString()));


  return Date.parse((new Date(year, month - 1, day, (hour || 0) - (new Date().getTimezoneOffset() === 0 ? 3: 0) , minute || 0 )).toUTCString());
}

export const sliceText = (text, wordsNumber) => {
  const splittedText = text.trim().split(' ');
  if (text.indexOf(' ') === -1 && text.length > 10) {
    // console.log(text);
    return text.substr(0, 10) + '...'
  }

  let newText = '';

  for (var i = 0; i < wordsNumber; i++) {
    if (!splittedText[i]) break;
    newText += ' ' + splittedText[i];
  }

  if (newText.split(' ').length -1 === wordsNumber) {
    newText += '...';
  }

  return newText;
}


export const checkText = (text) => {
  const words = [
    'свободный',
    'бесплатн',
    'free'
  ];

  let isFree = false;

  words.forEach(item => {
    if (text.indexOf(item) !== -1) {
      isFree = true;
    }
  });

  return isFree;
}
