import { Container } from "@/components/shared/container";
import { StructuredData } from "@/components/shared/structured-data";
import { buildBreadcrumbSchema, buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "CGV — Permapaysage",
  description: "Conditions générales de vente de Permapaysage.",
  path: "/conditions-generales-de-vente",
  noIndex: true,
});

export default function CgvPage() {
  return (
    <>
      <StructuredData
        data={[
          buildWebPageSchema({
            title: "CGV — Permapaysage",
            description: "Conditions générales de vente de Permapaysage.",
            path: "/conditions-generales-de-vente",
          }),
          buildBreadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "CGV", path: "/conditions-generales-de-vente" },
          ]),
        ]}
      />
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl space-y-8">
          <header className="space-y-2">
            <h1 className="text-4xl leading-tight tracking-tight md:text-5xl">
              Conditions générales de vente — Permapaysage
            </h1>
            <p className="text-sm text-neutral-600">Version applicable au 1er janvier 2024</p>
          </header>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Préambule</h2>
            <p>
              PERMAPAYSAGE est une Société par Actions Simplifiée Unipersonnelle, inscrite au Registre du Commerce et des
              Sociétés de NANTES sous le numéro 953 318 391, dont le siège social est situé au 18 avenue du Général
              Heurtaux, 44330 VALLET.
            </p>
            <p>
              La société PERMAPAYSAGE réalise tous travaux paysagers selon les besoins de ses clients : conception,
              création, aménagement (bois, pierre, végétal) et entretien d&apos;espaces extérieurs, dans le respect des
              principes de la permaculture et de l&apos;écologie locale (Vignoble Nantais).
            </p>
            <p>
              Les présentes Conditions Générales de Vente (ci-après «&nbsp;CGV&nbsp;») définissent les relations
              contractuelles entre PERMAPAYSAGE (ci-après «&nbsp;la Société&nbsp;») et ses clients particuliers ou
              professionnels (ci-après «&nbsp;le CLIENT&nbsp;»).
            </p>
            <p>
              Elles s&apos;appliquent à l&apos;ensemble des contrats de vente de produits et de prestations de services
              d&apos;aménagement paysager, ainsi qu&apos;à la pose de clôtures et terrasses, conclus et/ou exécutés par la
              Société, en France métropolitaine.
            </p>
            <p>
              Toute commande, signature de devis ou versement d&apos;acompte vaut acceptation pleine et entière, sans
              réserve, des présentes CGV. Toute modification souhaitée par le CLIENT doit faire l&apos;objet d&apos;une
              demande écrite acceptée expressément et par écrit par la Société pour lui être opposable. En cas de
              contradiction entre les présentes CGV et les conditions particulières figurant sur le devis ou tout autre
              document accepté par les deux parties, les conditions particulières priment.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 1 — Devis</h2>
            <p>La Société établit un devis écrit répondant au besoin formulé par le CLIENT.</p>
            <p>
              Le devis est élaboré gratuitement, sauf information préalable au CLIENT précisant son caractère payant.
              Sauf indication contraire, le devis&nbsp;:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Est valable 30 jours à compter de sa date d&apos;émission. Passé ce délai, les prix des matériaux (bois,
                acier, granulats, végétaux) sont révisables selon l&apos;évolution des indices fournisseurs et de
                l&apos;indice INSEE des prix à la production&nbsp;;
              </li>
              <li>N&apos;inclut que les prestations et produits qui y sont expressément décrits&nbsp;;</li>
              <li>
                N&apos;inclut pas les prestations préparatoires et accessoires (études, analyses de sols, relevés
                topographiques, etc.)&nbsp;;
              </li>
              <li>
                S&apos;entend pour l&apos;exécution des travaux dans des conditions normales de chantier (sol meuble,
                accès dégagé, absence de pollution), à l&apos;exclusion de prestations imposées par des conditions
                imprévues (enrochements, dépollution, remblais maçonnés, etc.)&nbsp;;
              </li>
              <li>
                N&apos;inclut pas les demandes d&apos;autorisations exigées par les règles d&apos;urbanisme, les
                règlements de copropriété ou les mesures de sécurité.
              </li>
            </ul>
            <p>
              Il appartient au CLIENT de s&apos;informer et de réaliser, sous sa seule responsabilité, toute formalité
              nécessaire à l&apos;obtention de ces autorisations.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 2 — Réalisation d&apos;une étude</h2>
            <p>
              La Société peut, à la demande du CLIENT, réaliser une étude (plan de masse, listing végétaux,
              scénographie, etc.). Le CLIENT reste libre de confier l&apos;exécution des travaux à la Société ou de
              réaliser lui-même les aménagements.
            </p>
            <p>
              Dans tous les cas, avant l&apos;exécution des travaux, le CLIENT s&apos;engage à remettre à la Société les
              plans des réseaux et ouvrages enterrés (eau, gaz, électricité, télécom, assainissement, arrosage
              automatique). La responsabilité de la Société ne pourra être engagée pour tout dégât causé à des réseaux
              non ou mal signalés.
            </p>
            <p>
              Les plans, croquis, listings végétaux et documents constituant l&apos;étude demeurent la propriété
              intellectuelle exclusive de la Société. Le CLIENT s&apos;engage à ne pas les reproduire, transmettre,
              exploiter ou commercialiser, ni à les faire exécuter par un tiers sans accord écrit préalable. En cas
              d&apos;exécution par un tiers sans accord, un forfait «&nbsp;Étude et Conception&nbsp;» sera facturé selon
              le barème en vigueur (minimum 8&nbsp;% du montant des travaux concernés).
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 3 — Formation du contrat</h2>
            <p>
              Le contrat est définitivement formé dès l&apos;acceptation du devis par le CLIENT, sans réserve ni
              modification, et après versement de l&apos;acompte prévu à l&apos;article 4.
            </p>
            <p>
              Toute demande de modification d&apos;un devis, formulée par observation sur celui-ci ou par tout autre
              moyen, constituera un obstacle à la formation du contrat sur la base du devis initial et donnera lieu à
              l&apos;établissement d&apos;un devis modificatif. Le contrat ne sera valablement formé qu&apos;après
              acceptation expresse de ce devis modificatif.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 4 — Prix et facturation</h2>
            <h3 className="text-lg font-medium">4.1 Acompte</h3>
            <p>Sauf accord contraire mentionné au devis&nbsp;:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                30&nbsp;% du montant TTC est versé par le CLIENT à l&apos;acceptation du devis pour les prestations
                standard&nbsp;;
              </li>
              <li>
                40&nbsp;% du montant TTC pour les ouvrages comportant du bois structural, de la pierre, ou un
                approvisionnement spécifique en végétaux d&apos;ornement supérieur à 1&nbsp;500&nbsp;€ HT.
              </li>
            </ul>
            <p>La commande ne recevra exécution qu&apos;après encaissement effectif de cet acompte par la Société.</p>

            <h3 className="text-lg font-medium">4.2 Solde</h3>
            <p>
              Le solde du prix est payable à la réception des travaux ou à la livraison, sauf modalités différentes
              convenues au devis. Pour les chantiers d&apos;une durée supérieure à trois semaines, des acomptes
              intermédiaires pourront être prévus.
            </p>
            <p>
              Aucun escompte ne sera accordé pour paiement anticipé. Modes de paiement acceptés&nbsp;: virement
              (privilégié), chèque, espèces (dans la limite légale).
            </p>

            <h3 className="text-lg font-medium">4.3 TVA</h3>
            <p>
              Les prix affichés s&apos;entendent hors taxes. La TVA applicable est celle en vigueur au jour de la
              facturation.
            </p>

            <h3 className="text-lg font-medium">4.4 Retards et impayés</h3>
            <p>Conformément aux articles L.441-10 et D.441-5 du Code de commerce&nbsp;:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Pénalités de retard&nbsp;: 3 fois le taux d&apos;intérêt légal en vigueur, exigibles de plein droit sans
                mise en demeure préalable&nbsp;;
              </li>
              <li>Indemnité forfaitaire pour frais de recouvrement&nbsp;: 40&nbsp;€&nbsp;;</li>
              <li>Frais réels de recouvrement supérieurs à 40&nbsp;€ facturés sur justificatifs.</li>
            </ul>
            <p>Tout retard entraîne, de plein droit&nbsp;:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>L&apos;exigibilité immédiate de toutes les sommes dues, même non échues&nbsp;;</li>
              <li>La suspension des chantiers en cours jusqu&apos;à régularisation&nbsp;;</li>
              <li>La possibilité d&apos;exiger le paiement intégral à la commande pour toute affaire ultérieure.</li>
            </ul>

            <h3 className="text-lg font-medium">4.5 Services à la Personne (SAP) — Crédit d&apos;impôt</h3>
            <p>
              Les prestations d&apos;entretien régulier réalisées au domicile du CLIENT particulier peuvent ouvrir droit
              à un crédit d&apos;impôt de 50&nbsp;% au titre des services à la personne, sous réserve&nbsp;:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Qu&apos;elles soient facturées via la coopérative agréée Unipros&nbsp;;</li>
              <li>
                Qu&apos;elles respectent les plafonds et conditions définis par l&apos;article 199 sexdecies du Code
                général des impôts&nbsp;;
              </li>
              <li>
                Qu&apos;il s&apos;agisse exclusivement de prestations d&apos;entretien (les travaux de création,
                aménagement, terrassement, pose de clôtures et terrasses ne sont pas éligibles).
              </li>
            </ul>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 5 — Réception des travaux</h2>
            <p>
              La signature d&apos;un procès-verbal de réception, avec ou sans réserves, déclenche le transfert des
              risques et le départ des garanties légales (parfait achèvement, biennale, décennale selon la nature de
              l&apos;ouvrage).
            </p>
            <p>
              En l&apos;absence de procès-verbal, la prise de possession effective des lieux ou des produits vaut
              réception. Les éventuelles réserves doivent alors être formulées par lettre recommandée avec accusé de
              réception dans un délai de 15 jours pour les travaux et 5 jours pour les produits livrés. À défaut, les
              travaux et produits sont présumés conformes.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 6 — Délais d&apos;exécution</h2>
            <p>
              Les délais communiqués sont indicatifs. Ils peuvent être reportés sans indemnité ni pénalité en cas&nbsp;:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                D&apos;aléas climatiques (gel, fortes pluies, canicule, sécheresse, vents violents), particulièrement
                fréquents en climat océanique&nbsp;;
              </li>
              <li>De respect des conditions saisonnières de plantation&nbsp;;</li>
              <li>De force majeure (article 8)&nbsp;;</li>
              <li>De difficultés d&apos;approvisionnement fournisseurs ou de transport&nbsp;;</li>
              <li>De retard imputable au CLIENT (accès, paiement de l&apos;acompte, autorisations).</li>
            </ul>
            <p>
              Aucun retard ne pourra justifier une annulation de commande, une retenue sur prix ou une demande de
              dommages et intérêts.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 7 — Responsabilité et force majeure</h2>
            <h3 className="text-lg font-medium">7.1 Nature de l&apos;obligation</h3>
            <p>
              La Société est tenue d&apos;une obligation de moyens et non de résultat, sauf disposition légale contraire
              (notamment garantie décennale sur ouvrages structuraux).
            </p>

            <h3 className="text-lg font-medium">7.2 Responsabilité du fait des produits défectueux</h3>
            <p>
              Conformément à l&apos;article 1245-15 du Code civil, la Société ne pourra voir sa responsabilité engagée
              au titre des dommages causés à des biens qui ne sont pas utilisés par le CLIENT principalement pour son
              usage ou sa consommation privée.
            </p>

            <h3 className="text-lg font-medium">7.3 Force majeure</h3>
            <p>
              La Société est exonérée de toute responsabilité lorsqu&apos;elle a été empêchée d&apos;exécuter tout ou
              partie de ses obligations en raison d&apos;un cas de force majeure. Sont notamment assimilés à des cas de
              force majeure&nbsp;: intempéries exceptionnelles, catastrophes naturelles, sécheresses et restrictions
              préfectorales d&apos;usage de l&apos;eau, inondations, épidémies, grèves ou pénurie de main-d&apos;œuvre,
              pénuries de matériaux, conflits armés, actes de l&apos;autorité publique — sauf lorsque ces assimilations
              sont interdites par des dispositions légales d&apos;ordre public.
            </p>

            <h3 className="text-lg font-medium">7.4 Assurances</h3>
            <p>
              La Société a souscrit une assurance Responsabilité Civile Professionnelle et Décennale auprès d&apos;un
              assureur agréé. Une attestation est remise sur simple demande du CLIENT.
            </p>
            <p>
              La responsabilité de la Société est limitée aux plafonds et conditions de cette police d&apos;assurance.
              Le CLIENT et ses assureurs renoncent à tout recours contre la Société et ses assureurs au-delà de ces
              conditions, quel que soit le type de dommage et son montant. Le CLIENT déclare avoir souscrit toutes
              assurances utiles pour couvrir tout sinistre direct et indirect pouvant affecter ses biens.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 8 — Garantie de reprise des végétaux</h2>
            <p>
              La Société n&apos;accorde aucune garantie contractuelle automatique. Cependant, les végétaux fournis ET
              plantés par la Société font l&apos;objet d&apos;une garantie contractuelle de reprise d&apos;une durée de
              12 mois à compter de la date de plantation, donnant droit à un remplacement unique par végétal défaillant.
            </p>
            <p>
              Cette garantie n&apos;est acquise que si l&apos;entretien post-plantation (arrosage, paillage, tuteurage,
              traitements adaptés) est&nbsp;:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Réalisé par le CLIENT conformément aux préconisations remises&nbsp;;</li>
              <li>OU confié contractuellement à la Société dans le cadre d&apos;un contrat d&apos;entretien.</li>
            </ul>
            <h3 className="text-lg font-medium">Exclusions</h3>
            <p>La garantie est exclue dans les cas suivants&nbsp;:</p>
            <ol className="list-decimal space-y-1 pl-6">
              <li>
                Défaut d&apos;entretien ou arrosage insuffisant par le CLIENT (bassinage, vérification des tuteurs et
                haubans, traitements parasitaires, désherbage des massifs)&nbsp;;
              </li>
              <li>Sécheresse exceptionnelle ou restrictions préfectorales d&apos;usage de l&apos;eau&nbsp;;</li>
              <li>
                Végétaux d&apos;espèces non préconisées par la Société mais imposés par le CLIENT (notamment exotiques
                inadaptés au climat océanique du 44)&nbsp;;
              </li>
              <li>Vandalisme, vol, gel exceptionnel, inondation, grêle, tempête, neige&nbsp;;</li>
              <li>Attaque parasitaire foudroyante (pyrale, processionnaire, capricorne asiatique, etc.)&nbsp;;</li>
              <li>Utilisation de produits désherbants ou phytosanitaires inappropriés par le CLIENT&nbsp;;</li>
              <li>Végétaux non fournis par la Société.</li>
            </ol>
            <p>
              Le CLIENT bénéficie en outre des garanties éventuelles offertes par les fournisseurs des produits que la
              Société lui a vendus.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 9 — Réserve de propriété</h2>
            <p>
              Les produits, matériaux et végétaux fournis demeurent la propriété de la Société jusqu&apos;au paiement
              intégral de leur prix. Le transfert des risques (perte, vol, détérioration) intervient toutefois dès la
              livraison sur site.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 10 — Droit de rétractation (clients particuliers)</h2>
            <p>
              Conformément aux articles L.221-18 et suivants du Code de la consommation, pour tout contrat conclu hors
              établissement (notamment au domicile du CLIENT), le CLIENT particulier dispose d&apos;un délai de 14 jours
              calendaires pour exercer son droit de rétractation, sans avoir à motiver sa décision ni supporter de
              frais.
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Un formulaire-type de rétractation est joint au devis&nbsp;;</li>
              <li>
                En cas de rétractation, la Société rembourse les sommes versées dans un délai maximum de 14 jours&nbsp;;
              </li>
              <li>
                Si le CLIENT a expressément demandé, par écrit, le commencement d&apos;exécution avant la fin du délai
                de rétractation, les prestations effectivement réalisées lui restent dues au prorata de
                l&apos;avancement.
              </li>
            </ul>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 11 — Éthique, environnement et gestion des déchets</h2>
            <p>Engagée dans une démarche de paysagisme écologique, la Société applique les principes suivants&nbsp;:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Zéro produit phytosanitaire de synthèse (désherbants, pesticides, fongicides chimiques)&nbsp;;</li>
              <li>
                Gestion in situ des rémanents privilégiée&nbsp;: broyage, paillage, haies de Benjes, compostage&nbsp;;
              </li>
              <li>Privilège donné aux végétaux locaux adaptés au climat océanique du Vignoble Nantais&nbsp;;</li>
              <li>Privilège donné aux fournisseurs et matériaux locaux (Loire-Atlantique)&nbsp;;</li>
              <li>
                L&apos;évacuation en déchetterie est une option facturée en supplément, sur demande explicite du CLIENT.
              </li>
            </ul>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 12 — Protection des données personnelles (RGPD)</h2>
            <p>Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés modifiée&nbsp;:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Les données personnelles collectées (nom, adresse, téléphone, email) sont utilisées exclusivement pour
                l&apos;exécution du contrat, la facturation et le suivi commercial&nbsp;;
              </li>
              <li>
                Elles sont conservées pendant la durée légale de conservation des documents commerciaux et comptables
                (10 ans)&nbsp;;
              </li>
              <li>
                Le CLIENT dispose d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de portabilité et
                d&apos;opposition, exerçable à&nbsp;:{" "}
                <a href="mailto:contact@permapaysage.fr" className="underline">
                  contact@permapaysage.fr
                </a>
                &nbsp;;
              </li>
              <li>Aucune donnée n&apos;est cédée à des tiers à des fins commerciales.</li>
            </ul>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 13 — Droit à l&apos;image et propriété du site internet</h2>
            <p>
              Sauf opposition écrite du CLIENT formulée avant le démarrage du chantier, la Société se réserve le droit
              de photographier les ouvrages réalisés et de les utiliser à des fins de communication (site internet,
              réseaux sociaux, supports commerciaux), sans mention d&apos;éléments permettant d&apos;identifier le
              CLIENT ou la localisation précise du bien.
            </p>
            <p>
              La Société est seule propriétaire de son site internet et responsable de l&apos;ensemble des mentions
              informatives, techniques ou commerciales qui y sont contenues. Les informations, images, schémas et
              descriptifs visuels ou techniques diffusés sur le site PERMAPAYSAGE le sont à titre strictement indicatif,
              sans pouvoir être considérés comme contractuels, et sont susceptibles d&apos;être modifiés à tout moment
              de façon unilatérale par la Société.
            </p>
          </section>

          <section className="space-y-3 text-sm leading-relaxed">
            <h2 className="text-2xl">Article 14 — Litiges, médiation et juridiction</h2>
            <h3 className="text-lg font-medium">14.1 Résolution amiable</h3>
            <p>
              En cas de différend, les parties s&apos;engagent à rechercher une solution amiable avant toute action
              contentieuse.
            </p>

            <h3 className="text-lg font-medium">14.2 Médiation de la consommation (clients particuliers)</h3>
            <p>
              Conformément à l&apos;article L.612-1 du Code de la consommation, le CLIENT particulier peut recourir
              gratuitement au médiateur de la consommation&nbsp;:
            </p>
            <p>
              CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice
              <br />
              14 rue Saint-Jean, 75017 Paris
              <br />
              <a href="https://www.cm2c.net" target="_blank" rel="noopener noreferrer" className="underline">
                www.cm2c.net
              </a>
            </p>

            <h3 className="text-lg font-medium">14.3 Loi applicable et juridiction</h3>
            <p>
              Les présentes CGV sont soumises au droit français. À défaut d&apos;accord amiable, le Tribunal de Nantes
              (44) sera seul compétent, sous réserve des dispositions légales d&apos;ordre public protectrices des
              consommateurs.
            </p>
          </section>

          <footer className="border-t pt-6 text-xs text-neutral-600">
            PERMAPAYSAGE — SASU au capital social de 1&nbsp;000&nbsp;€ — RCS Nantes 953 318 391 — Siège social&nbsp;: 18
            avenue du Général Heurtaux, 44330 VALLET
          </footer>
        </Container>
      </section>
    </>
  );
}
