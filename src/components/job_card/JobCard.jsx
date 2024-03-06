import React from 'react';
import { Card } from 'react-bootstrap';
import './job_card.css';
import { FaBuilding, FaMoneyBillWave, FaClock, FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa';
import websiteImages from '../../utils/websiteImages';
import { IoDocumentText } from "react-icons/io5";
import { MdHomeWork } from "react-icons/md";
import { formatDate } from '../../utils/formatDate';

const JobCard = ({ offer }) => {

    const websiteImage = websiteImages[offer.Website_info.Website_name] || websiteImages['default'];

    return (
        <Card className="job-card">
            <Card.Body className="job-card-body d-flex justify-content-between">
                <div className="job-card-info">
                    <Card.Title className="job-card-title">{offer.Position}</Card.Title>
                    <div className="job-card-text">
                        <div className="job-card-tags">
                            {offer.Location && (
                                <div className="job-card-tag">
                                    <FaMapMarkerAlt className="icon-class-name" /> {offer.Location}
                                </div>
                            )}
                            {offer.Job_type && (
                                <div className="job-card-tag">
                                    <IoDocumentText className="icon-class-name" /> {offer.Job_type}
                                </div>
                            )}
                            {offer.Working_hours && (
                                <div className="job-card-tag">
                                    <FaRegCalendarAlt className="icon-class-name" /> {offer.Working_hours}
                                </div>
                            )}
                            {offer.Job_model && (
                                <div className="job-card-tag">
                                    <MdHomeWork className="icon-class-name" /> {offer.Job_model}
                                </div>
                            )}
                        </div>
                        {offer.Firm && (
                            <div className="mt-3">
                                <FaBuilding className="icon-class-name" /> <strong>{offer.Firm}</strong>
                            </div>
                        )}
                        {offer.Earnings && (
                            <div className="mt-2">
                                <FaMoneyBillWave className="icon-class-name" /> <strong>{offer.Earnings}</strong>
                            </div>
                        )}
                    </div>
                </div>
                <div className="website-info">
                    <Card.Img
                        className="card_image"
                        src={websiteImage}
                        alt="Website"
                    />
                </div>
            </Card.Body>
            <Card.Footer className="job-card-footer d-flex justify-content-between align-items-center">
                <div className="job-card-date"><FaClock className="icon-class-name" />{formatDate(offer.Date)}</div>
                <a href={offer.Link} className="btn btn-primary job-card-link" target="_blank" rel="noopener noreferrer">Przejdź do oferty</a>
            </Card.Footer>
        </Card>
    );
};

export default JobCard;
