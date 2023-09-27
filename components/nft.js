import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react"
import { LOYALTY_CARD_CONTRACT_ADDRESS } from "../const/addresses"
import updateLoyaltyCard from "../lib/update-points"
import { useEffect, useState } from "react"
import Quiz from './Quiz';
import styles from "../styles/Home.module.css"
import { Modal, Button } from 'react-bootstrap';


export const NFTCard = ({ nft, tokenID }) => {
    const [quizPassed, setQuizPassed] = useState(false);
    const [showQuizModal, setShowQuizModal] = useState(false); // New state for modal visibility
    const { contract } = useContract(LOYALTY_CARD_CONTRACT_ADDRESS);
    const { data: loyaltyCard, isLoading: loadingLoyaltyCard } = useNFT(contract, tokenID);
   let [loyaltyCardPoints, setLoyaltyCardPoints] = useState(0);
  
    useEffect(() => {
      setLoyaltyCardPoints(loyaltyCard?.metadata.attributes[0].value);  // @ts-ignore
    }, [loyaltyCard]);
  
    const onQuizCompletion = (passed) => {
        console.log("Quiz passed:", passed);  // Debugging line
        setShowQuizModal(false);  // Close the quiz modal
        if (passed) {
          setQuizPassed(true);
        } else {
          alert("You must pass the quiz to update points.");
        }
      };
      
 
  console.log(loyaltyCard?.metadata.name)
  console.log(loyaltyCard?.metadata.image)


  useEffect(() => {
    // @ts-ignore
    setLoyaltyCardPoints(loyaltyCard?.metadata.attributes[0].value)
    console.log(loyaltyCardPoints)
  }, [loyaltyCard])


  return (
    <div className={styles.loyaltyCard}>
      <ThirdwebNftMedia metadata={nft.metadata} height="100%" width="100%" />
      {nft.metadata.attributes && (
        <>
          {/* @ts-ignore */}
          {nft.metadata.attributes.map((attribute, index) => (
            <div key={index} className={styles.loyaltyCardPoints}>
              {attribute.trait_type}: {attribute.value}
            </div>
          ))}
        </>
      )}
     {quizPassed ? (
      <div>
      <div className={styles.points}>
        Current Points: {loyaltyCardPoints}
      </div>
      <div className={styles.points}>
        Updated Points: {loyaltyCardPoints + 10}
      </div>
      <button
        onClick={async () => {
          await updateLoyaltyCard(nft, loyaltyCardPoints, tokenID);
          // Refresh loyalty card points
          // @ts-ignore
          await setLoyaltyCardPoints(loyaltyCard?.metadata.attributes[0].value);
        }}
        className={styles.updatePointsBtn}
      >
        Update points
      </button>
    </div>
      ) : (
        <>
        <p>To update the card, pass the quiz</p>
          <Button variant="primary" onClick={() => setShowQuizModal(true)}>
            Take Quiz
          </Button>

          <Modal show={showQuizModal} onHide={() => setShowQuizModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Blockchain Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Quiz onQuizCompletion={onQuizCompletion} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowQuizModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};