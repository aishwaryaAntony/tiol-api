var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./src/routes/index');
var masterCategoryRouter = require('./src/routes/masterCategory');
var masterSubCategoryRouter = require('./src/routes/masterSubCategory');
var roleRouter = require('./src/routes/role');
var juryRouter = require('./src/routes/jury');
var surveyQuestionRouter = require('./src/routes/surveyQuestion');
var surveyOptionRouter = require('./src/routes/surveyOption');
var blogRouter = require('./src/routes/blog');
var bannerRouter = require('./src/routes/banner');
var userRouter = require('./src/routes/user');
var nomineeApplicationRouter = require('./src/routes/nomineeApplication');
var awardSeasonRouter = require('./src/routes/awardSeason');
var galleryRouter = require('./src/routes/gallery');
var awardCategoryRouter = require('./src/routes/awardCategory');
var awardSubCategoryRouter = require('./src/routes/awardSubCategory');
var industryTypeRouter = require('./src/routes/industryType');
var nomineeApplicationSurveyRouter = require('./src/routes/nomineeApplicationSurvey');
var awardSurveyQuestionRouter = require('./src/routes/awardSurveyQuestion');
var selectedNomineeRouter = require('./src/routes/selectedNominee');
var voterRouter = require('./src/routes/voter');
var awardRouter = require('./src/routes/award');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/master-categories', masterCategoryRouter);
app.use('/master-sub-categories', masterSubCategoryRouter);
app.use('/roles', roleRouter);
app.use('/juries', juryRouter);
app.use('/survey-questions', surveyQuestionRouter);
app.use('/survey-options', surveyOptionRouter);
app.use('/blogs', blogRouter);
app.use('/banners', bannerRouter);
app.use('/users', userRouter);
app.use('/nominee-applications', nomineeApplicationRouter);
app.use('/award-seasons', awardSeasonRouter);
app.use('/galleries', galleryRouter);
app.use('/award-categories', awardCategoryRouter);
app.use('/award-sub-categories', awardSubCategoryRouter);
app.use('/industry-types', industryTypeRouter);
app.use('/nominee-application-surveys', nomineeApplicationSurveyRouter);
app.use('/award-survey-questions', awardSurveyQuestionRouter);
app.use('/selected-nominees', selectedNomineeRouter);
app.use('/voters', voterRouter);
app.use('/awards', awardRouter);



module.exports = app;
