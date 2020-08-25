import crypto from 'crypto';
import slug from 'slug';

import Prescription from '../models/prescription.model';
// import User from '../models/user.model';
import {
  successResponse,
  excludeProperty,
  saveResourceToRedis,
  errorResponse,
} from '../utils/helpers.utils';
// import client from '../db/redis.db';


/**
 * Create A Fixture
 * @param {object} req
 * @param {object} res
 * @returns {object} prescription object
 */
export async function createPrescription(req, res) {
  const {
    usage,
    duration
  } = req.body;

  const user = excludeProperty(req.user, ['password', '__v']);

  const prescription = new Prescription({
    usage,
    duration,
    createdBy: user,
  });

  const newPrescription = await prescription.save();

  const prescriptionData = excludeProperty(newPrescription, ['__v']);

  return successResponse(
    res,
    201,
    'Fixture created',
    prescriptionData,
  );
}

// /**
//  * Update A Fixture
//  * @param {object} req
//  * @param {object} res
//  * @returns {object} fixture object
//  */
// export async function updateFixture(req, res) {
//   const { fixtureId } = req.params;
//   const { time, home, away, location } = req.body;
//   const user = excludeProperty(req.user, ['password', '__v']);

//   const homeTeam = await Team.findOne({ name: home });
//   const awayTeam = await Team.findOne({ name: away });

//   if (!homeTeam || !awayTeam) {
//     return errorResponse(
//       res,
//       400,
//       'One or both of the teams does not exist',
//       null,
//     );
//   }

//   const fixture = await Fixture.findOne({ _id: fixtureId });

//   if (!fixture) {
//     return errorResponse(res, 404, 'This fixture does not exist', null);
//   }

//   if (fixture.createdBy._id.toString() != user._id.toString()) {
//     return errorResponse(
//       res,
//       404,
//       'You can not update a fixture you did not create',
//       null,
//     );
//   }

//   const updatedFixture = await Fixture.findByIdAndUpdate(
//     { _id: fixture._id },
//     { time, homeTeam, awayTeam, location },
//     { new: true },
//   );

//   const updatedFixtureData = excludeProperty(updatedFixture, ['__v']);
//   const allFixtures = await Fixture.find({}, { __v: 0 });
//   await saveResourceToRedis('fixtures', allFixtures);

//   return successResponse(
//     res,
//     200,
//     responseDataOrigin.db,
//     'Fixture updated',
//     updatedFixtureData,
//   );
// }

// /**
//  * Delete A Fixture
//  * @param {object} req
//  * @param {object} res
//  * @returns {object} response object
//  */
// export async function deleteFixture(req, res) {
//   const { fixtureId } = req.params;
//   const user = excludeProperty(req.user, ['password', '__v']);
//   const fixture = await Fixture.findOne({ _id: fixtureId });

//   if (!fixture) {
//     return errorResponse(res, 404, 'This fixture does not exist', null);
//   }

//   if (fixture.createdBy._id.toString() != user._id.toString()) {
//     return errorResponse(
//       res,
//       404,
//       'You can not delete a team you did not create',
//       null,
//     );
//   }

//   await Fixture.findByIdAndDelete({ _id: fixture._id });
//   const allFixtures = await Fixture.find({}, { __v: 0 });
//   await saveResourceToRedis('fixtures', allFixtures);

//   return successResponse(
//     res,
//     200,
//     responseDataOrigin.server,
//     'Fixture has been deleted',
//     null,
//   );
// }