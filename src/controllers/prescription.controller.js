import Prescription from '../models/prescription.model';

import {
  successResponse,
  excludeProperty,
  errorResponse,
} from '../utils/helpers.utils';



/**
 * Create A Prescription
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

  return successResponse(
    res,
    201,
    'Fixture created',
    newPrescription,
  );
}

/**
 * Update A Prescription
 * @param {object} req
 * @param {object} res
 * @returns {object} prescription object
 */
export async function updatePrescription(req, res) {
  const {
    prescriptionId
  } = req.params;

  const user = excludeProperty(req.user, ['password', '__v']);

  const prescription = await Prescription.findOne({
    _id: prescriptionId
  });

  if (!prescription) {
    return errorResponse(res, 404, 'Prescription not found', null);
  }

  if (prescription.createdBy._id.toString() != user._id.toString()) {
    return errorResponse(
      res,
      404,
      'You can not update a prescription you did not create',
      null,
    );
  }

  const updatedPrescription = await Prescription.findByIdAndUpdate({
    _id: prescription._id
  }, {
    ...req.body
  }, {
    new: true
  }, );

  return successResponse(
    res,
    200,
    'Prescription updated',
    updatedPrescription,
  );
}


/**
 * Delete A Prescription
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export async function deletePrescription(req, res) {
  const {
    prescriptionId
  } = req.params;

  const user = excludeProperty(req.user, ['password', '__v']);

  const prescription = await Prescription.findOne({
    _id: prescriptionId
  });

  if (!prescription) {
    return errorResponse(res, 404, 'This prescription does not exist', null);
  }

  if (prescription.createdBy._id.toString() != user._id.toString()) {
    return errorResponse(
      res,
      404,
      'You can not delete a prescription you did not create',
      null,
    );
  }

  await Prescription.findByIdAndDelete({
    _id: prescription._id
  });


  return successResponse(
    res,
    200,
    'Prescription has been deleted',
    null,
  );
}