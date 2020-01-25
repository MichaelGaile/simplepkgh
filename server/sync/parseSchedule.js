const cheerio = require('cheerio'),
  htmlparser  = require('htmlparser2'),
  translit    = require('cyrillic-to-translit-js'),
  rp          = require('request-promise');

/* Struct schedule */
/*{
  name: { type: String },
  className: { type: String },
  table: [
    {
      dayWeek: { type: String },
      lesson: [
        {
          numSubject: { type: String },
          numTeacher: { type: String },

          denSubject: { type: String },
          denTeacher: { type: String },
        }
      ]
    }
  ],
  replace: {
    timeStamp: '',
    lesson: [
      {
        numSubject: { type: String },
        numTeacher: { type: String },

        denSubject: { type: String },
        denTeacher: { type: String },
      }
    ]
  }
}*/

/**
 * parseSchedule
 *
 * @param url
 * @returns {promise}
 */
async function parseSchedule(url) {
  /**
   * getId
   *
   * @param str
   * @returns {string}
   */
  function getId(str) {
    return translit().transform((Array.from(str).filter((s) => { return /^([a-zа-яё]+|\d+)$/i.test(s) })).join(''));
  }
  const schedule = [];
  let numGroup = 0;

  // Request to url
  return rp(url).then((res) => {
    const dom               = htmlparser.parseDOM(res);
    const $                 = cheerio.load(dom);
    const scheduleElements  = $('h4');
    let className           = '';

    scheduleElements.each((numEl, el) => {
      if ($(el).hasClass('dotted')) {
        className = $(el).text();
      } else if ($(el).hasClass('expanded')) {

        if($(el).text().indexOf('Замен') !== -1) {
          console.log('Has text replace!');
        } else {
          /*Some schedule*/
          const groupName = $(el).text();
          const id        = getId(groupName);
          const parent    = $(el).parent();
          const table     = $(parent).find('table');

          schedule[numGroup] = {
            id: id,
            table: [],
            className: className,
            name: groupName,
            replace: {
              timeStamp: '',
              lesson: [],
            },
          };

          table.each((numTable, el) => {
            const dayWeek   = $($(el).find('.groupname').get(0)).text();
            const cellTable = $(el).find('tr');

            schedule[numGroup].table[numTable] = {
              dayWeek: dayWeek,
              lesson: [],
            }

            cellTable.each((cellNum, el) => {
              const numSubject = $($(el).find('.pname').get(0)).text();
              const numTeacher = $($(el).find('.pteacher').get(0)).text();
              const denSubject = $($(el).find('.paltname').get(0)).text();
              const denTeacher = $($(el).find('.paltteacher').get(0)).text();

              schedule[numGroup].table[numTable].lesson[cellNum] = {
                numSubject: numSubject,
                numTeacher: numTeacher,
                denSubject: denSubject,
                denTeacher: denTeacher,
              };
            });
          });
          numGroup++;
        }

      }
    });
    /*Parse replace*/
    const replace = $('.shedule tbody').get(0);
    if(replace) {
      const row = $(replace).find('tr');
      $(row).each((numRow, el) => {

        const groupName  = $($(el).find('.group').get(0)).text();
        const id         = getId(groupName);

        const num        = $($(el).find('.pnum').get(0)).text();
        const numSubject = $($(el).find('.pnum').get(0)).text();
        const numTeacher = $($(el).find('.pteacher').get(0)).text();
        const denSubject = $($(el).find('.pnum').get(1)).text();
        const denTeacher = $($(el).find('.pteacher').get(1)).text();

        // Check exists group in schedule
        const indexGroup = schedule.findIndex((group) => {return group.id === id});
        if(indexGroup !== -1) {
          schedule[indexGroup].replace.timeStamp = '';
          schedule[indexGroup].replace.lesson.push({
            num        : num,
            numSubject : numSubject,
            numTeacher : numTeacher,
            denSubject : denSubject,
            denTeacher : denTeacher,
          });
        } else {
          console.error('Not found group in replace to schedule: ', groupName);
        }
      });
    }
    return schedule;
  });
}

module.exports = parseSchedule;
