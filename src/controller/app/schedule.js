const schedule = require('node-schedule');


const scheduleRunner = async() => {
    let startTime = new Date(Date.now() + 5000);
    let endTime = new Date(startTime.getTime() + 5000);
    let j = schedule.scheduleJob({ start: startTime, end: endTime }, function(){
        console.log('Time for tea!');
        j.cancel();
    });
}


module.exports = scheduleRunner;