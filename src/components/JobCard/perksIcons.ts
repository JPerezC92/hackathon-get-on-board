import { IconType } from 'react-icons';
import { AiOutlineWifi } from 'react-icons/ai';
import { BiMicrophone } from 'react-icons/bi';
import { BsBicycle, BsPhoneFill } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { CiStopwatch } from 'react-icons/ci';
import { FaBirthdayCake, FaBusAlt, FaCar, FaChild, FaLaptopCode, FaPeopleArrows, FaToolbox } from 'react-icons/fa';
import { GiConverseShoe, GiLifeBar } from 'react-icons/gi';
import { ImArrowUpRight2, ImExit } from 'react-icons/im';
import { IoIosFitness, IoIosPeople } from 'react-icons/io';
import {
	MdAirlineSeatReclineExtra,
	MdChildFriendly,
	MdFastfood,
	MdHealthAndSafety,
	MdOutlineCameraOutdoor,
	MdOutlineCastForEducation,
	MdOutlineFastfood,
	MdOutlineLocalParking,
	MdOutlinePets,
	MdOutlineSick,
	MdSettingsAccessibility,
	MdShareLocation,
} from 'react-icons/md';
import { RiKakaoTalkLine, RiMentalHealthFill, RiRemoteControlLine } from 'react-icons/ri';
import { SlGameController, SlPlane } from 'react-icons/sl';
import { TbDental, TbShoppingCartDiscount } from 'react-icons/tb';
import { TiFlowParallel } from 'react-icons/ti';
import { VscLibrary } from 'react-icons/vsc';

export const perksIcons: Record<string, IconType> = {
	accessible: MdSettingsAccessibility,
	beverages_and_snacks: MdOutlineFastfood,
	bicycle_parking: BsBicycle,
	childcare: FaChild,
	commuting_buses: FaBusAlt,
	commuting_stipend: FaCar,
	company_retreats: SlPlane,
	computer_provided: FaLaptopCode,
	computer_repairs: FaToolbox,
	conference_stipend: BiMicrophone,
	dental_insurance: TbDental,
	digital_library: CgFileDocument,
	education_stipend: MdOutlineCastForEducation,
	equity_offered: IoIosPeople,
	fitness_subsidies: IoIosFitness,
	flexible_hours: CiStopwatch,
	free_car_parking: MdOutlineLocalParking,
	health_coverage: MdHealthAndSafety,
	informal_dresscode: GiConverseShoe,
	internal_talks: RiKakaoTalkLine,
	library: VscLibrary,
	life_insurance: GiLifeBar,
	meals_provided: MdFastfood,
	mobile_provided: BsPhoneFill,
	outdoors: MdOutlineCameraOutdoor,
	paid_sick_days: MdOutlineSick,
	parental_leave_over_legal: MdChildFriendly,
	performance_bonus: ImArrowUpRight2,
	personal_coaching: FaPeopleArrows,
	pet_friendly: MdOutlinePets,
	recreational_areas: SlGameController,
	relocation: MdShareLocation,
	remote_full: AiOutlineWifi,
	remote_partial: RiRemoteControlLine,
	retirement_plan: ImExit,
	shopping_discounts: TbShoppingCartDiscount,
	speaker_travel: BiMicrophone,
	time_for_side_projects: TiFlowParallel,
	vacation_on_birthday: FaBirthdayCake,
	vacation_over_legal: MdAirlineSeatReclineExtra,
	wellness: RiMentalHealthFill,
} as const;
