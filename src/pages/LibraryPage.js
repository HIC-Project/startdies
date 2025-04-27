import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../themes';
import useFlashcardsSets from '../hooks/useFlashcardsSets';
import useStudySets from '../hooks/useStudySets';

export default function LibraryPage() {
  const { flashcardSets, removeFlashcardSet,  } = useFlashcardsSets();
  const { sets, removeSet } = useStudySets();
      const navigate = useNavigate();
  
      const formatDate = isoString => {
          const dt = new Date(isoString);
          return dt.toLocaleString(undefined, {
              year:   'numeric',
              month:  'long',
              day:    'numeric',
              hour:   '2-digit',
              minute: '2-digit'
          });
      };
  
  return (

    <div style={styles.container}>     
      <div style={styles.header}>
          <h1 style={styles.header}>Library</h1>
      </div>

      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Your Recent
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the 
              <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              Flashcards
            </button>
          </h2>
          <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
              <div style={styles.container}>
                          <a href='/flashcards' style={{textDecoration: 'none'}}>
                            <h1 style={styles.header}>Flashcards</h1>
                          </a>
                            <table style={styles.table}>
                                <thead>
                                <tr>
                                    <th style={styles.th}>Title</th>
                                    <th style={styles.th}>Description</th>
                                    <th style={styles.th}>Date Created</th>
                                    <th style={styles.th} colSpan="2">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {flashcardSets.map(s => (
                                    <tr key={s.id}>
                                        <td style={styles.td}>
                                            <button
                                                style={styles.playBtn}
                                                onClick={() => navigate(`/flashcards/example/${s.id}`)}
                                            >
                                                Study
                                            </button>{' '}
                                            {s.title}
                                        </td>
                                        <td style={styles.td}>
                                            {s.description}
                                        </td>
                                        <td style={styles.td}>
                                            {formatDate(s.dateCreated)}
                                        </td>
                                        <td style={styles.td}>
                                            <button
                                                style={styles.deleteBtn}
                                                onClick={() => removeFlashcardSet(s.id)}
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                        <td style={styles.td}>
                                        <button style={styles.editBtn}
                                          onClick={() => navigate(`/flashcards/edit/${s.id}`)}>
                                          ✏️
                                        </button>
                                      </td>   
                                    </tr>
                                ))}
                              </tbody>
                          </table>
                      </div>
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              Match
            </button>
          </h2>
          <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
                <div style={styles.container}>
                  <h1 style={styles.header}>Match Sets</h1>
                  <table style={styles.table}>
                      <thead>
                      <tr>
                          <th style={styles.th}>Title</th>
                          <th style={styles.th}>Date Created</th>
                          <th style={styles.th}>Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {sets.map(s => (
                          <tr key={s.id}>
                              <td style={styles.td}>
                                  <button
                                      style={styles.playBtn}
                                      onClick={() => navigate(`/match/${s.id}`)}
                                  >
                                      Play
                                  </button>{' '}
                                  {s.title}
                              </td>
                              <td style={styles.td}>
                                  {formatDate(s.dateCreated)}
                              </td>
                              <td style={styles.td}>
                                  <button
                                      style={styles.deleteBtn}
                                      onClick={() => removeSet(s.id)}
                                  >
                                      🗑️
                                  </button>
                              </td>
                          </tr>
                      ))}
                      </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingFour">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
              Test
            </button>
          </h2>
          <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the 
              <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
          </div>
        </div>
      </div>

    </div>       
  );
}

const styles = {
  container: {
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative'
  },
  header: {fontSize: '2.5rem', color: COLORS.teal, textAlign: 'center'},
  form: {maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem'},
  label: {display: 'flex', flexDirection: 'column', fontSize: '1rem'},
  input: {
      padding: '0.5rem',
      fontSize: '1rem',
      border: `1px solid ${COLORS.lightMint}`,
      borderRadius: '4px',
      marginTop: '0.25rem',
      flex: 1
  },
  textarea: {
      padding: '0.5rem',
      fontSize: '1rem',
      border: `1px solid ${COLORS.lightMint}`,
      borderRadius: '4px',
      marginTop: '0.25rem',
      flex: 1
  },
  pairRow: {display: 'flex', gap: '0.5rem'},
  removePairBtn: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.2rem',
      color: COLORS.teal
  },
  addPairBtn: {
      backgroundColor: COLORS.lightMint,
      border: 'none',
      padding: '0.5rem',
      borderRadius: '4px',
      cursor: 'pointer',
      alignSelf: 'flex-start'
  },
  submitBtn: {
      backgroundColor: COLORS.darkBlue,
      color: '#fff',
      padding: '0.75rem',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
  },
  backButton: {
      position: 'absolute',   
      top: '1rem',          
      left: '1rem',           
      backgroundColor: COLORS.darkBlue,
      color: '#fff',
      padding: '0.4rem 0.6rem',
      fontSize: '0.9rem',  
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      zIndex: 1000           
  }
};

