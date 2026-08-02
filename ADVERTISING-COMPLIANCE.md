# Advertising Compliance Checklist (Google Ads / ASA / SRA)

Goal: make every claim on the site **true and documented** before running paid ads.
For this vertical (fund recovery + financial + legal services), Google's review
targets unsubstantiated/fabricated trust signals, and the penalty is account
suspension, often permanent, without warning. The same rules apply under UK ASA/CAP
and SRA advertising rules. "Safe" is not about wording; it's about substantiation.

Status legend:  🔴 Blocker (fix before any ad runs)  🟡 Verify/substantiate  🟢 General requirement

---

## 🔴 Blockers, remove or correct before advertising

1. **"As seen in" media bar**, [index.html](index.html) `media-section` (~line 908):
   The Guardian, Reuters, Financial Times, BBC News, Wired, Forbes.
   You did **not** confirm real coverage exists. Uncited major-outlet name-drops are
   misrepresentation **and** trademark misuse.
   → Provide real published article URLs, or **remove the entire section** (and any
     related i18n strings).

2. **Stock-photo / inconsistent testimonials**, [index.html](index.html) `testimonials-section`
   (~lines 959–1049). Even if the cases are real, the page currently uses:
   - Unsplash **stock photos** as client faces.
   - Invented names + oddly precise figures that **don't reconcile**
     (e.g. "85% of £180,000" but the badge says "£153,000").
   - The **same** stock photo (`photo-1519085360753-af0119f7cbe7`) for both a client
     ("David L.", ~line 1010) **and** a team member ("David Chen", ~line 887).
   → For each testimonial you keep: written client consent on file; real or properly
     anonymized identity (initials OK, no stock face); figures that match your records
     and are internally consistent; add a disclaimer: *"Individual results vary. Past
     results do not guarantee future outcomes."* Remove the duplicate-photo collision.
   → If you can't meet that bar, replace the section with a neutral
     "case types we handle" block (no names, photos, or amounts).

3. **Team bios with stock photos**, [index.html](index.html) `team-section` (~lines 867–902).
   Bios claim "Europol collaboration," "300+ cases," "Chainalysis certified," "12+ years."
   → Use real staff photos and only claims each person can evidence; otherwise remove
     the unverifiable specifics. Fabricated staff credentials are misrepresentation.

4. **"FCA Aware" badge**, [index.html](index.html) (~line 929). Not a real designation;
   implies FCA oversight that recovery firms don't have.
   → Remove, or replace with an accurate statement of your actual regulatory status.

---

## 🟡 Verify / substantiate (you said these are real, confirm exact wording matches evidence)

5. **Chainalysis claims**, "Chainalysis Partner" (~line 941), team "Chainalysis Certified"
   (~line 883), plus FAQ schema + methodology copy.
   A product **license to use the tool** usually does **not** permit calling yourself a
   "Partner" or staff "Certified" unless you're enrolled in their official Partner Program
   / hold their certification.
   → Check your license/agreement for the exact permitted-use wording. If "Partner/Certified"
     isn't licensed, downgrade to e.g. *"We use Chainalysis-grade blockchain forensics tools."*

6. **SRA No. 830575**, must match the public SRA register exactly: regulated entity name,
   authorised activities, and that the advertised trading name maps to the registered firm.
   → Confirm on the SRA register; display the SRA-regulated digital badge. Remember SRA-regulated
     firms must follow SRA Transparency Rules (clear costs) and not make misleading claims.

7. **ICO registration**, confirm the registration is live on the ICO register.
   → Display the registration number.

8. **Quantitative claims**, "100+ blockchains covered," success implications, etc.
   → Keep only what's true; avoid implying guaranteed or "typical" success.

---

## 🟢 General Google Ads requirements for a financial-services landing page

9. **Business identity** clearly visible: legal entity name, **real registered physical address**,
   working phone, email. (Phone/email present; add a verifiable address.)
10. **Fee model** clearly stated, the site now uses "no win, no fee"; keep it consistent everywhere
    and make sure it matches your actual client engagement terms.
11. **Privacy policy + terms** present and accurate (already on site).
12. **No fake urgency, no guarantees** of recovery. Add a results-vary disclaimer near any outcome claim.
13. **No cloaking**, the ad's landing page must be the real destination users see.
14. **Advertiser verification**, Google may require business/financial-services advertiser verification
    (legal entity docs, possibly licensing) before approving ads in this category.

---

## ⚠️ Bigger-picture note

Google may restrict or prohibit "get your money back" **fund-recovery** advertising outright in some
regions regardless of substantiation (see Google's "Financial products and services" and
"Misrepresentation" policies). You will likely have more success framing the ads around the
**regulated legal service** (e.g. fraud dispute / legal representation) than around guaranteed fund
recovery. Confirm current policy for your target countries before launching.

---

_This checklist reflects the site state as of the date it was generated. No site content was changed
when it was produced. Resolve the 🔴 items, verify the 🟡 items against your actual documentation, then
have the changes made and re-reviewed before enabling campaigns._
